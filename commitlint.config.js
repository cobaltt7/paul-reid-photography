/** @type {import("@commitlint/types").UserConfig} */
module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [2, "always", ["devx", "feat", "fix", "photos"]],
		"body-full-stop": [2, "never"],
		"scope-empty": [2, "never"],
		"subject-case": [0],
		"subject-exclamation-mark": [2, "never"],
		"scope-enum": [
			2,
			"always",
			[
				"community", // https://github.com/RedGuy12/paul-reid-photography/community
				"ci", // any automatic checks - actions, hooks, husky, etc
				"lint", // eslint, prettier, commitlint, etc
				"build", // build steps - webpack, babel, terser, etc
				"refactor", // rewriting things
				"deps", // updating dependencies
				"misc", // anything not included (consider adding new scopes)

				"ui", // styling and logos
				"fader", // the fader commitlint
				"list", // the list component
				"masonry", // the masonry component
				"subgalleries", // nested galleries
				"service-worker", // service worker
				"pages", // pages
				"errors", // error handling
				"search", // searching
				"api", // anything for a computer to process - rss feeds, sitemaps, seo, etc

				// only for `photos` type
				"add", // new gallery
				"remove", // remove a gallery or photo
				"update", // update a gallery with new photos
			],
		],
	},
};
