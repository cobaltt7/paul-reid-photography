/* eslint-disable @typescript-eslint/no-var-requires */

const fileSystem = require("fs/promises");
const path = require("path");
const exifr = require("exifr");
const sizeOf = require("image-size").default;
const Fraction = require("fraction.js").default;
const webpack = require("webpack");

/** @returns {Promise<import("./src/types").Galleries>} */
async function fetchGalleries() {
	const PHOTOS_DIR = path.resolve(__dirname, "./public/img/photos");

	return fileSystem.readdir(PHOTOS_DIR).then(async (files) => {
		// Filter out non-directories
		const directories = (
			await Promise.all(
				files.map(async (gallery) => ({
					isDirectory: (
						await fileSystem.lstat(path.resolve(PHOTOS_DIR, gallery))
					).isDirectory(),
					gallery,
				})),
			)
		).filter(({ isDirectory }) => isDirectory);

		const promises = directories.map(async ({ gallery: title }) => {
			const directory = path.resolve(PHOTOS_DIR, title);
			/** Start loading photo paths in the background. */
			const photosPromise = fileSystem.readdir(directory);

			// Load data from the folder title
			const slug = title.toLowerCase().replace(/[^\w]+/g, "-");

			/**
			 * Load _meta.json.
			 *
			 * @type {{ [key: string]: any }}
			 */
			const metaFolder = await new Promise((resolve) =>
				// wrapped in a promise so we can use `.catch` for if it doesn't exist
				resolve(require(path.resolve(directory, "./_meta.json"))),
			).catch(() => ({}));

			/** Load photos, remove non-images, sort. */
			const photoNames = (await photosPromise)
				.filter((photo) => path.extname(photo) === ".jpg")
				.sort();

			const photos = await Promise.all(
				photoNames.map(async (photo) => {
					const photoPath = path.resolve(PHOTOS_DIR, title, photo);
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
						path: path
							.relative(path.resolve(__dirname, "public", slug), photoPath)
							.replaceAll("\\", "/"),
					};
				}),
			);
			return {
				...metaFolder,
				title,
				slug,
				photos,
			};
		});

		return Promise.all(promises);
	});
}

/**
 * @param {import("@vue/cli-service").PluginAPI} api
 * @param {string} command
 */
async function registerCommand(api, command) {
	api.registerCommand(command + ":prerender", async (args) => {
		const galleries = await fetchGalleries();
		api.configureWebpack(() => {
			console.log(galleries)
			return {
				plugins: [
					new webpack.DefinePlugin({
						__galleries__: JSON.stringify(galleries),
						test:'{}'
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
