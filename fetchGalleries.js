/** @file Fetch Galleries data. This is seperated from the build step beause it must be asyncronous. */
"use strict";

const Fraction = require("fraction.js").default,
	exifr = require("exifr"),
	fileSystem = require("fs/promises"),
	path = require("path"),
	sizeOf = require("image-size").default,
	slugify = require("slugify").default,
	webpack = require("webpack");

const PUBLIC_DIR = path.resolve(__dirname, "public"),
	// eslint-disable-next-line sort-vars -- `PHOTOS_DIR` depends on `PUBLIC_DIR`
	PHOTOS_DIR = path.resolve(PUBLIC_DIR, "img/photos"),
	SLUGIFY_OPTIONS = {
		lower: true,
		strict: true,
	};

/**
 * Get all subdirectories of a directory.
 *
 * @param {string} pathToScan - Path to scan for galleries.
 *
 * @returns {Promise<string[]>} - Array of subdirectories.
 */
async function getDirectoryChildren(pathToScan) {
	const files = await fileSystem.readdir(pathToScan);

	// Filter out non-directories
	return (
		await Promise.all(
			files.map(async (gallery) => {
				const resolvedPath = path.resolve(pathToScan, gallery);

				return {
					gallery: resolvedPath,
					isDirectory: (await fileSystem.lstat(resolvedPath)).isDirectory(),
				};
			}),
		)
	)
		.filter(({ isDirectory }) => isDirectory)
		.map(({ gallery }) => gallery);
}

/**
 * Load a JSON or JS file using `require`, ignoring any errors.
 *
 * @param {string} filepath - File to load.
 *
 * @returns {Promise<unknown>} - File content.
 */
async function silentlyLoadFile(filepath) {
	return await new Promise(
		(resolve) =>
			// Wrapped in a promise so we can use `.catch` for if it doesn't exist
			{
				resolve(require(filepath));
			},
		// eslint-disable-next-line no-empty-function -- We don't want to do anything on erorrs.
	).catch(() => {});
}

/**
 * Load EXIF data from a photo.
 *
 * @param {string} photoPath - Path to the photo.
 *
 * @returns {Promise<{
 * 	aperture: number;
 * 	city: string;
 * 	country: string;
 * 	date: Date;
 * 	exposure: number;
 * 	height: number;
 * 	isoSpeed: number;
 * 	latitude: number;
 * 	longitude: number;
 * 	model: string;
 * 	shutterSpeed: string;
 * 	state: string;
 * 	width: number;
 * }>}
 *   - EXIF data.
 */
async function loadExif(photoPath) {
	const filePromise = fileSystem.readFile(photoPath),
		// eslint-disable-next-line sort-vars -- `dimensionsPromise` depends on `filePromise`
		dimensionsPromise = filePromise.then((buffer) => sizeOf(buffer)),
		/**
		 * Load EXIF data.
		 *
		 * @type {Promise<{
		 * 	City: string;
		 * 	State: string;
		 * 	Country: string;
		 * 	ExposureTime: string;
		 * 	ISO: string;
		 * 	ApertureValue: string;
		 * 	ExposureCompensation: string;
		 * 	latitude: string;
		 * 	longitude: string;
		 * 	CreateDate: string;
		 * 	Model: string;
		 * }>} -
		 *   Note that only properties we care about are listed here.
		 */
		// eslint-disable-next-line sort-vars -- `exifPromise` depends on `filePromise`
		exifPromise = filePromise.then(async (buffer) => await exifr.parse(buffer, true)),
		[exif, dimensions] = await Promise.all([exifPromise, dimensionsPromise]);

	return {
		aperture: +exif.ApertureValue,
		city: exif.City,
		country: exif.Country,
		date: new Date(exif.CreateDate),
		exposure: +exif.ExposureCompensation,
		height: dimensions.height || 0,
		isoSpeed: +exif.ISO,
		latitude: +exif.latitude,
		longitude: +exif.longitude,
		model: exif.Model,
		shutterSpeed: new Fraction(exif.ExposureTime).toFraction(),
		state: exif.State,
		width: dimensions.width || 0,
	};
}

/**
 * Generate data for galleries.
 *
 * @template {boolean} T
 * @param {string[]} directories - Directories to scan.
 * @param {T & boolean} [shallow] - Whether to allow subgalleries.
 *
 * @returns {Promise<
 * 	(T extends true ? import("./src/types").ShallowGallery : import("./src/types").Gallery)[]
 * >}
 *   - Array of gallery data.
 */
async function generateGalleryData(directories, shallow) {
	const promises = directories.map(
		/**
		 * Load data for a single gallery.
		 *
		 * @param {string} directory - Directory of the gallery.
		 *
		 * @returns {Promise<import("./src/types").Gallery>} - Gallery data.
		 */ async (directory) => {
			/** Start loading photo paths in the background. */
			const photosPromise = fileSystem.readdir(directory);

			// Load data from the folder title.
			const titleArray = path.basename(directory).split(","),
				// eslint-disable-next-line sort-vars -- `isFeatured` depends on `titleArr`
				isFeatured = !!titleArray[0],
				// eslint-disable-next-line sort-vars -- `title` depends on `titleArr`
				title = (titleArray[0] || titleArray[1] || "").trim(),
				// eslint-disable-next-line sort-vars -- `slug` depends on `title`
				slug = `/${slugify(title, SLUGIFY_OPTIONS)}`;

			const folderChildren = (await photosPromise).map((folderChild) =>
					path.resolve(directory, folderChild),
				),
				metaFolder =
					/** @type {{ [key: string]: any }} */ (
						await silentlyLoadFile(path.resolve(directory, "./_meta.json"))
					) || {};

			if (!shallow && folderChildren[0]) {
				const isNested = (await fileSystem.lstat(folderChildren[0])).isDirectory();

				if (isNested) {
					const galleries = await generateGalleryData(folderChildren, true);
					const featuredGallery =
						galleries.find((gallery) => gallery.isFeatured) || galleries[0];

					if (!galleries[0]?.firstPhoto || !featuredGallery?.firstPhoto) {
						return {
							...metaFolder,
							galleries: [],
							slug,
							title,
						};
					}

					/** @type {import("./src/types").NestedGallery} */
					return {
						...metaFolder,
						featured: featuredGallery.featured,
						firstPhoto: galleries[0].firstPhoto,
						galleries,
						slug,
						title,
					};
				}
			}

			/** Load photos, remove non-images, sort. */
			const photoNames = folderChildren
				.filter((photo) => path.extname(photo) === ".jpg")
				.sort((a, b) => +a - +b);

			const photos = (
				await Promise.all(
					photoNames.map(async (photo) => {
						const photoPath = path.resolve(directory, photo);

						return {
							...(await loadExif(photoPath)),
							isFeatured: path.basename(photoPath).endsWith(",.jpg"),
							path: `/${path.relative(PUBLIC_DIR, photoPath).replaceAll("\\", "/")}`,
						};
					}),
				)
			).sort((photoA, photoB) => photoA.date.valueOf() - photoB.date.valueOf());

			const featured = photos.find((photo) => photo.isFeatured) || photos[0];

			if (!photos[0] || !featured) {
				return {
					...metaFolder,
					isFeatured,
					photos: [],
					slug,
					title,
				};
			}

			/** @type {import("./src/types").ShallowGallery} */
			return {
				...metaFolder,
				featured,
				firstPhoto: photos[0],
				isFeatured,
				photos,
				slug,
				title,
			};
		},
	);

	return /** @type {any} */ (
		(await Promise.all(promises))
			.filter((gallery) => {
				if ("galleries" in gallery && gallery.galleries?.length) return true;

				if ("photos" in gallery && gallery.photos?.length) return true;

				return false;
			})
			.sort(
				(galleryA, galleryB) =>
					(galleryB.firstPhoto?.date.valueOf() || 0) -
					(galleryA.firstPhoto?.date.valueOf() || 0),
			)
	);
}

/**
 * Fetch galleries in a directory.
 *
 * @param {string} directory - Directory to scan.
 *
 * @returns {Promise<import("./src/types").Gallery[]>} - Gallery data.
 */
async function fetchGalleries(directory) {
	return await getDirectoryChildren(directory).then(generateGalleryData);
}

/**
 * Register a prerender command to vue-cli-service.
 *
 * @param {import("@vue/cli-service").PluginAPI} api - The API of vue-cli-service.
 * @param {string} command - The command to register a prerender command for.
 */
function registerCommand(api, command) {
	api.registerCommand(`${command}:prerender`, async (arguments_) => {
		const galleries = await fetchGalleries(PHOTOS_DIR);

		api.configureWebpack(() => ({
			plugins: [
				new webpack.DefinePlugin({
					"_galleries": JSON.stringify(galleries),
					"process.env": JSON.stringify({ NODE_ENV: process.env.NODE_ENV }),
				}),
			],
		}));

		await api.service.run(command, arguments_);
	});
}

module.exports = /** @type {import("@vue/cli-service").ServicePlugin} */ (api) => {
	registerCommand(api, "build");
	registerCommand(api, "serve");

	return {
		defaultModes: {
			"build:prerender": "production",
			"serve:prerender": "development",
		},
	};
};
