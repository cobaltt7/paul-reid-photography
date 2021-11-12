// vue.config.js
/* eslint-disable @typescript-eslint/no-var-requires */
const fileSystem = require("fs");
const path = require("path");
const webpack = require("webpack");

const PHOTOS_DIR = path.resolve(__dirname, "./public/img/photos");

/** @type {import("./src/types").Galleries} */
const galleries = fileSystem
	.readdirSync(PHOTOS_DIR)
	.filter((gallery) => fileSystem.lstatSync(path.resolve(PHOTOS_DIR, gallery)).isDirectory())
	.map((gallery) => {
		const [, year, month, day, title] = gallery.match(/^(\d{4})(\d{2})(\d{2}) (.*)$/) || [];

		const slug = title.toLowerCase().replace(/[^\w]+/g, "-");

		return {
			...new Promise((resolve) =>
				// wrapped in a promise so we can use `.catch` for if it doesn't exist
				resolve(require(path.resolve(process.cwd(), "./_meta.json"))),
			).catch(() => ({})),
			date: { year: +year, month: +month, day: +day },
			title,
			slug,
			photos: fileSystem
				.readdirSync(path.resolve(PHOTOS_DIR, gallery))
				.filter((photo) => path.extname(photo) === ".jpg")
				.sort()
				.map((photo) =>
					path
						.relative(
							path.resolve(__dirname, "public", slug),
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
