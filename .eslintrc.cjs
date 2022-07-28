/** @file ESLint Configuration file. */
"use strict";

require("@rushstack/eslint-patch/modern-module-resolution");

/** @type {import("eslint").Linter.Config} */
const config = {
	extends: "@redguy12",

	globals: { _galleries: "readonly" },

	overrides: [
		{
			extends: "@redguy12/eslint-config/config",
			// Configuration files
			files: "fetchGalleries.js",
		},
		{
			extends: "@redguy12/eslint-config/browser",
			// Client-side scripts (including HTML files)
			files: ["src/**/*.{js,ts}", "static/**/*.{js,ts}"],
		},
		// // Once it is translated:
		// {
		// 	files: "**.vue",
		// 	rules: {
		// 		"vue/no-bare-strings-in-template": 2,
		// 	},
		// },
		{
			files: "!**.md/*",

			parserOptions: {
				ecmaVersion: "latest",
				project: require("path").resolve(__dirname, "./tsconfig.json"),
			},
		},
	],

	root: true,

	rules: {
		"no-underscore-dangle": [
			2,
			{
				allow: ["_galleries"],
				enforceInMethodNames: true,
			},
		],
	},
};

module.exports = config;
