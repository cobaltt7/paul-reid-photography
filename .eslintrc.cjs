/** @file ESLint Configuration file. */
"use strict";

module.exports = {
	extends: ["plugin:@redguy12/recommended"],

	globals: {
		_galleries: "readonly",
		process: "readonly",
	},

	overrides: [
		{
			extends: ["plugin:@redguy12/config"],
			// Configuration files
			files: ["fetchGalleries.js"],
		},
		{
			extends: ["plugin:@redguy12/browser"],
			// Client-side scripts (including HTML files)
			files: ["src/**/*.{js,ts}", "public/**/*.{js,ts}"],
		},
		{
			files: ["!**.md/*"],

			parserOptions: {
				ecmaVersion: "latest",
				project: "./tsconfig.json",
			},
		},
		// Once it is translated:
		// {
		// 	files: ["**.vue"],
		// 	rules: {
		// "vue/no-bare-strings-in-template": 2,
		// 	}
		// }
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
