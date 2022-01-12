/** @file Tailwind Configuration file. */
"use strict";

/** @see {@link https://tailwindcss.com/docs/customizing-colors#color-palette-reference} For available colors. */
const colors = require("tailwindcss/colors"),
	typography = require("@tailwindcss/typography");

/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
	content: ["./{public,src}/**/*.{vue,html}"],
	darkMode: "class",
	plugins: [typography],

	theme: {
		colors: JSON.parse(
			JSON.stringify({
				...colors,
				blueGray: undefined,
				coolGray: undefined,
				current: "currentColor",
				lightBlue: undefined,
				transparent: "transparent",
				trueGray: undefined,
				warmGray: undefined,
			}),
		),

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
