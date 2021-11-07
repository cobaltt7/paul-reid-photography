// vue.config.js
/* eslint-disable @typescript-eslint/no-var-requires */
const fileSystem = require("fs");
const path = require("path");
const webpack = require("webpack");

const PHOTOS_DIR = path.resolve(__dirname, "./public/img/photos");

/** @type {import("./src/types").galleries} */
const galleries = fileSystem
	.readdirSync(PHOTOS_DIR)
	.filter((gallery) => fileSystem.lstatSync(path.resolve(PHOTOS_DIR, gallery)).isDirectory())
	.map((gallery) => {
		const [, date, title] = gallery.match(/^(\d{8}) (.*)$/);

		return {
			...new Promise((resolve) =>
				// wrapped in a promise so we can use `.catch` for if it doesn't exist
				resolve(require(path.resolve(process.cwd(), "./_meta.json"))),
			).catch(() => ({})),
			date,
			title,
			slug: title.toLowerCase().replace(/[^\w]+/g, "-"),
			photos: fileSystem
				.readdirSync(path.resolve(PHOTOS_DIR, gallery))
				.filter((photo) => path.extname(photo) === ".jpg")
				.sort()
				.map((photo) =>
					path
						.relative(
							path.resolve(__dirname, "public"),
							path.resolve(PHOTOS_DIR, gallery, photo),
						)
						.replaceAll("\\", "/"),
				),
		};
	});

/** @type {import("@vue/cli-service").ProjectOptions} */
module.exports = {
	// options...
	productionSourceMap: false,
	configureWebpack() {
		return {
			plugins: [
				new webpack.DefinePlugin({
					__galleries__: JSON.stringify(galleries),
				}),
			],
		};
	},
	css: { extract: true, sourceMap: true },
};
