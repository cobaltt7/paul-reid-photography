/** @file Commitlint Configuration file. */
"use strict";

/** @type {import("@commitlint/types").UserConfig} */

const config = {
	extends: ["@commitlint/config-conventional"],

	rules: {
		"body-full-stop": [2, "never", "."],
		"scope-empty": [2, "never"],

		"scope-enum": [
			2,
			"always",
			[
				"community", // https://github.com/RedGuy12/paul-reid-photography/community
				"ci", // Any automatic checks - actions, hooks, husky, etc
				"lint", // eslint, prettier, commitlint, etc
				"build", // Build steps - webpack, babel, terser, etc
				"refactor", // Rewriting things
				"deps", // Updating dependencies
				"misc", // Anything not included (consider adding new scopes)

				"ui", // Styling and logos
				"fader", // The PhotosFader commitlint
				"list", // The GalleryList component
				"masonry", // The masonry component
				"subgalleries", // Nested galleries
				"service-worker", // Service worker
				"pages", // Pages
				"errors", // Error handling
				"search", // Searching
				"api", // Anything for a computer to process - rss feeds, sitemaps, seo, etc

				// Only for `photos` type
				"add", // New gallery
				"remove", // Remove a gallery or photo
				"update", // Update a gallery with new photos
			],
		],

		"subject-case": [0],
		"subject-exclamation-mark": [2, "never"],
		"type-enum": [2, "always", ["devx", "feat", "fix", "photos"]],
	},
};

module.exports = config;
