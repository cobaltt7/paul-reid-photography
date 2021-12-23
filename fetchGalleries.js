/* eslint-disable @typescript-eslint/no-var-requires */

const fileSystem = require("fs/promises");
const path = require("path");
const exifr = require("exifr");
const sizeOf = require("image-size").default;
const Fraction = require("fraction.js").default;
const webpack = require("webpack");
const slugify = require("slugify").default;
const SLUGIFY_OPTIONS = {
	lower: true,
	strict: true,
};

const PUBLIC_DIR = path.resolve(__dirname, "public");
const PHOTOS_DIR = path.resolve(PUBLIC_DIR, "img/photos");

/** @param {string} pathToScan */
async function getDirectoryChildren(pathToScan) {
	const files = await fileSystem.readdir(pathToScan);

	// Filter out non-directories
	return (
		await Promise.all(
			files.map(async (gallery) => {
				const resolvedPath = path.resolve(pathToScan, gallery);
				return {
					isDirectory: (await fileSystem.lstat(resolvedPath)).isDirectory(),
					gallery: resolvedPath,
				};
			}),
		)
	)
		.filter(({ isDirectory }) => isDirectory)
		.map(({ gallery }) => gallery);
}

/** @param {string} filepath */
function silentlyLoadFile(filepath) {
	return new Promise(
		(resolve) =>
			// wrapped in a promise so we can use `.catch` for if it doesn't exist
			resolve(require(filepath)),
		// eslint-disable-next-line @typescript-eslint/no-empty-function
	).catch(() => {});
}

/** @param {string} photoPath */
async function loadExif(photoPath) {
	const filePromise = fileSystem.readFile(photoPath);

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
	const exifPromise = filePromise.then((buffer) => exifr.parse(buffer, true));
	const dimensionsPromise = filePromise.then((buffer) => sizeOf(buffer));
	const [exif, dimensions] = await Promise.all([exifPromise, dimensionsPromise]);

	return {
		city: exif.City,
		state: exif.State,
		country: exif.Country,
		shutterSpeed: new Fraction(exif.ExposureTime).toFraction(),
		aperture: +exif.ApertureValue,
		isoSpeed: +exif.ISO,
		exposure: +exif.ExposureCompensation,
		model: exif.Model,
		date: new Date(exif.CreateDate),
		latitude: +exif.latitude,
		longitude: +exif.longitude,
		width: dimensions.width || 0,
		height: dimensions.height || 0,
	};
}

/**
 * @template {boolean} T
 * @param {string[]} directories
 * @param {T & boolean} [shallow]
 *
 * @returns {Promise<
 * 	(T extends true ? import("./src/types").ShallowGallery : import("./src/types").Gallery)[]
 * >}
 */
async function generateGalleryData(directories, shallow) {
	const promises = directories.map(async (directory) => {
		/** Start loading photo paths in the background. */
		const photosPromise = fileSystem.readdir(directory);

		// Load data from the folder title.
		const titleArr = path.basename(directory).split(",");
		const isFeatured = !!titleArr[0];
		const title = (titleArr[0] || titleArr[1]).trim();
		const slug = "/" + slugify(title, SLUGIFY_OPTIONS);

		/**
		 * Load _meta.json.
		 *
		 * @type {{ [key: string]: any }}
		 */
		const metaFolder = (await silentlyLoadFile(path.resolve(directory, "./_meta.json"))) || {};

		const folderChildren = (await photosPromise).map((folderChild) =>
			path.resolve(directory, folderChild),
		);
		if (!shallow) {
			const isNested = (await fileSystem.lstat(folderChildren[0])).isDirectory();

			if (isNested) {
				const galleries = await generateGalleryData(folderChildren, true);
				const featuredGallery =
					galleries.find((gallery) => gallery.isFeatured) || galleries[0];
				/** @type {import("./src/types").NestedGallery} */
				const returnVal = {
					firstPhoto: galleries[0].firstPhoto,
					photos: undefined,
					title,
					featured: featuredGallery?.featured || featuredGallery?.firstPhoto,
					slug,
					galleries,
				};
				return returnVal;
			}
		}

		/** Load photos, remove non-images, sort. */
		const photoNames = folderChildren.filter((photo) => path.extname(photo) === ".jpg").sort();

		let featured;

		const photos = (
			await Promise.all(
				photoNames.map(async (photo) => {
					const photoPath = path.resolve(directory, photo);
					const meta = {
						...(await loadExif(photoPath)),
						path: "/" + path.relative(PUBLIC_DIR, photoPath).replaceAll("\\", "/"),
					};
					if (path.basename(photoPath).endsWith(",.jpg")) featured = meta;
					return meta;
				}),
			)
		).sort((photoA, photoB) => photoA.date.valueOf() - photoB.date.valueOf());
		featured ||= photos[0];

		/** @type {import("./src/types").ShallowGallery} */
		const returnVal = {
			...metaFolder,
			title,
			slug,
			photos,
			firstPhoto: photos[0],
			featured,
			galleries: undefined,
			isFeatured,
		};
		return returnVal;
	});

	return /** @type {any} */ (
		(await Promise.all(promises))
			.filter(({ photos, galleries }) => galleries?.length || photos?.length)
			.sort(
				(galleryA, galleryB) =>
					galleryA.firstPhoto.date.valueOf() - galleryB.firstPhoto.date.valueOf(),
			)
	);
}

/**
 * @param {string} directoryToScan
 *
 * @returns {Promise<import("./src/types").Galleries>}
 */
async function fetchGalleries(directoryToScan) {
	return getDirectoryChildren(directoryToScan).then(generateGalleryData);
}

/**
 * @param {import("@vue/cli-service").PluginAPI} api
 * @param {string} command
 */
async function registerCommand(api, command) {
	api.registerCommand(command + ":prerender", async (args) => {
		const galleries = await fetchGalleries(PHOTOS_DIR);
		api.configureWebpack(() => {
			return {
				plugins: [
					new webpack.DefinePlugin({
						__galleries__: JSON.stringify(galleries),
					}),
				],
			};
		});

		await api.service.run(command, args);
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
