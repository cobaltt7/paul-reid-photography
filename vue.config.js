/** @file Vue & Webpack configuration. */
"use strict";

/** @type {import("@vue/cli-service").ProjectOptions} */
module.exports = {
	// Options...
	css: { extract: true, sourceMap: true },
	productionSourceMap: false,
	chainWebpack: config => {
	  config.resolve.alias.set('vue', '@vue/compat')

	  config.module
		.rule('vue')
		.use('vue-loader')
		.tap(options => {
		  return {
			...options,
			compilerOptions: {
			  compatConfig: {
				MODE: 2
			  }
			}
		  }
		})
	}
};
