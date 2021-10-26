// vue.config.js
/* eslint-disable @typescript-eslint/no-var-requires */
const fileSystem = require("fs")
const path = require("path")
const webpack = require("webpack")

const PHOTOS_DIR = path.resolve(__dirname, "./public/img/photos");

const galleries = fileSystem.readdirSync(PHOTOS_DIR)
	.filter(gallery => fileSystem.lstatSync(path.resolve(PHOTOS_DIR, gallery)).isDirectory())

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

