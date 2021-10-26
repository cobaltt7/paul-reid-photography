// vue.config.js
/* eslint-disable @typescript-eslint/no-var-requires */
const fileSystem = require("fs")
const path = require("path")
const webpack = require("webpack")

const PHOTOS_DIR = path.resolve(__dirname, "./public/img/photos");

/** @type {import("./src/types").galleries} */
const galleries = fileSystem.readdirSync(PHOTOS_DIR)
	.filter(gallery => fileSystem.lstatSync(path.resolve(PHOTOS_DIR, gallery)).isDirectory())
	.map(gallery => {
		return {
			...require(path.resolve(PHOTOS_DIR, gallery,"./_data.json")),
			slug: gallery,
			photos: fileSystem.readdirSync(path.resolve(PHOTOS_DIR, gallery))
				.filter(photo => path.extname(photo) === ".jpg")
				.map(photo =>
					path.relative(path.resolve(__dirname,"public"),path.resolve(PHOTOS_DIR, gallery,photo)).replace(/\\/, "/")
				)
		}
	})

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
 module.exports = {
	// options...
	 productionSourceMap: false,
	 configureWebpack: {

		 plugins: [

			 new webpack.DefinePlugin({
				 galleries: (JSON.stringify(galleries))
			 })]
	 },
	 css:{extract:true,sourceMap:true}
 }

