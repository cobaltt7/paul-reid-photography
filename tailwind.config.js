/** @file Tailwind Configuration file. */
"use strict";

/** @see {@link https://tailwindcss.com/docs/customizing-colors#color-palette-reference} For available colors. */
const colors = require("tailwindcss/colors"),
	typography = require("@tailwindcss/typography");

/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
	darkMode: "class",

	plugins: [typography],

	content: ["./{public,src}/**/*.{vue,html}"],

	theme: {
		colors: {
			...colors,
			current: "currentColor",
			transparent: "transparent",
			lightBlue: undefined,
			warmGray: undefined,
			trueGray: undefined,
			coolGray: undefined,
			blueGray: undefined,
		},

		screens: {
			"2xl": { max: "1535px" },
			"2xs": { max: "320px" },
			"landscape": { raw: "(orientation: landscape)" },
			"lg": { max: "1023px" },
			"md": { max: "767px" },
			"portrait": { raw: "(orientation: portrait)" },
			"print": { raw: "print" },
			"sm": { max: "600px" },
			"xl": { max: "1279px" },
			"xs": { max: "475px" },
		},
	},
};
