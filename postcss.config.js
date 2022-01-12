/**
 * @file PostCss Configuration file.
 * @todo Type it.
 */
"use strict";

module.exports = {
	map: process.env.NODE_ENV !== "production",
	parser: "postcss-scss",

	plugins: {
		/* eslint-disable sort-keys -- order matters here */
		"postcss-import": {},
		"tailwindcss/nesting": {},
		"tailwindcss": {},
		"postcss-advanced-variables": {},

		"cssnano": {
			autoprefixer: false,
			discardUnused: true,
			mergeIdents: true,
			reduceIdents: true,
			zindex: true,
		},

		"autoprefixer": {},
		/* eslint-enable sort-keys -- re-enable; see above */
	},
};
