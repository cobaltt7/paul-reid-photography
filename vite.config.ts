import { readFileSync } from "fs";
import path from "path";
import url from "url";

import typography from "@tailwindcss/typography";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import htmlnano from "htmlnano";
import postcssAdvancedVariables from "postcss-advanced-variables";
import postcssImport from "postcss-import";
import postcssScss from "postcss-scss";
import posthtml from "posthtml";
import tailwindcss from "tailwindcss";
import colors from "tailwindcss/colors";
import tailwindcssNesting from "tailwindcss/nesting/index";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import restart from "vite-plugin-restart";

import galleries, { PUBLIC_DIR, PHOTOS_DIR } from "./fetchGalleries";

const cwd = path.dirname(url.fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(path.resolve(cwd, "./package.json"), "utf8"));
// const pkgLock = JSON.parse(readFileSync(path.resolve(cwd, "./package-lock.json"), "utf8"));

// https:///vitejs.dev/config/
const config = defineConfig(async ({ command }) => ({
	build: {
		commonjsOptions: { transformMixedEsModules: true },

		emptyOutDir: true,
		minify: "terser",
		outDir: "../dist",

		rollupOptions: {
			// input: "index.html",
			output: { compact: true, validate: true },
			preserveEntrySignatures: "strict",
		},

		terserOptions: {
			compress: {
				arguments: true,
				booleans_as_integers: true,
				hoist_funs: true,
				hoist_vars: true,
				keep_fargs: false,
				keep_infinity: true,
				passes: 3,
				unsafe_Function: true,
				unsafe_comps: true,
				unsafe_methods: true,
				unsafe_proto: true,
				unsafe_undefined: true,
			},

			ecma: 2016,

			format: {
				comments: false,
				indent_level: 0,
				inline_script: false,
				semicolons: false,
				webkit: true,
			},

			module: true,

			parse: { html5_comments: false },
		},
	},

	css: {
		postcss: {
			map: command === "serve",

			plugins: [
				postcssImport,
				tailwindcssNesting,
				tailwindcss({
					content: ["./{static,src}/**/*.{vue,html}"],
					darkMode: "class",
					plugins: [typography],

					theme: {
						colors: {
							...colors,
							blueGray: undefined,
							coolGray: undefined,
							current: "currentColor",
							lightBlue: undefined,
							transparent: "transparent",
							trueGray: undefined,
							warmGray: undefined,
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
				}),
				postcssAdvancedVariables({}),

				cssnano({
					autoprefixer: false,
					discardUnused: true,
					mergeIdents: true,
					reduceIdents: true,
					zindex: true,
				}),

				autoprefixer({ grid: "no-autoplace" }),
			],

			syntax: postcssScss,
		},
	},

	define: { _galleries: JSON.stringify(await galleries(PHOTOS_DIR)) },
	esbuild: { logLimit: 0, treeShaking: true },

	plugins: [
		vue({ isProduction: command === "build" }),

		{
			apply: "build",
			enforce: "post",
			name: "htmlnano",

			async transformIndexHtml(input): Promise<string> {
				const { html } = await posthtml([
					htmlnano({
						collapseAttributeWhitespace: true,
						collapseBooleanAttributes: true,
						collapseWhitespace: true,
						deduplicateAttributeValues: true,
						mergeScripts: true,
						mergeStyles: true,
						minifyJs: false,
						minifyJson: true,

						minifySvg: {
							cleanupListOfValues: true,
							convertStyleToAttrs: true,
							reusePaths: true,
							sortAttrs: true,
						},

						normalizeAttributeValues: true,
						removeAttributeQuotes: true,
						removeComments: "all",
						removeEmptyAttributes: true,
						removeRedundantAttributes: true,
						sortAttributes: "frequency",
						sortAttributesWithLists: "frequency",
					}),
				]).process(input, {
					quoteAllAttributes: false,
					recognizeCDATA: true,
					recognizeSelfClosing: true,
					sourceLocations: true,
					sync: false,
				});

				return html;
			},
		},
		{
			...babel({
				babelConfig: {
					assumptions: {
						arrayLikeIsIterable: true,
						constantReexports: true,
						constantSuper: true,
						ignoreFunctionLength: true,
						ignoreToPrimitiveHint: true,
						noClassCalls: true,
						noDocumentAll: true,
						noIncompleteNsImportDetection: true,
						noNewArrows: true,
						objectRestNoSymbols: true,
						privateFieldsAsProperties: true,
						pureGetters: true,
						setClassMethods: true,
						setComputedProperties: true,
						setPublicClassFields: true,
						setSpreadProperties: true,
					},

					caller: {
						name: pkg.name,
						supportsDynamicImport: true,
						supportsExportNamespaceFrom: false,
						supportsStaticESM: true,
						supportsTopLevelAwait: false,
					},

					envName: "production",
					minified: true,
					parserOpts: { sourceType: "module" },

					presets: [
						[
							"@babel/preset-env",
							{
								bugfixes: true,
								// corejs: pkgLock.dependencies["core-js"].version,
								modules: false,
								spec: true,
								// useBuiltIns: "usage",
							},
						],
					],

					targets: pkg.browserslist?.join(", ") ?? "defaults",
				},

				// filter: /^.+$/,
			}),

			apply: "build",
			enforce: "post",
		},

		{
			...restart({
				restart: ["fetchGalleries.ts", "tsconfig.json", "vite.config.ts", "package.json"],
			}),
			apply: "serve",
		},
	],

	publicDir: PUBLIC_DIR,
	root: "src",
}));

export default config;
