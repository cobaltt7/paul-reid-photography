<!-- @file The template for all pages. -->

<template>
	<Head>
		<meta
			name="apple-mobile-web-app-title"
			itemprop="name"
			property="og:site_name"
			:content="meta.page.siteTitle"
		/>
		<!-- page title -->
		<title>{{ meta.page.computedTitle }}</title>
		<meta
			itemprop="name"
			name="twitter:title"
			property="og:title"
			:content="meta.page.computedTitle"
		/>
		<!-- page desc -->
		<meta name="description" itemprop="description" :content="meta.page.description" />
		<meta
			name="twitter:description"
			property="og:description"
			:content="meta.page.description"
		/>
		<!-- canonical -->
		<link rel="canonical" name="twitter:url" :content="meta.page.url" property="og:url" />
		<!-- featured img -->
		<meta
			v-if="meta.gallery && !meta.gallery.empty"
			itemprop="image"
			name="twitter:image"
			property="og:image"
			:content="meta.gallery.featured"
		/>

		<!-- point to parent gallery -->
		<link v-if="meta.gallery && !meta.gallery.empty" rel="index" :href="meta.gallery.parent" />
		<!-- geographical -->
		<meta
			v-if="meta.gallery && !meta.gallery.empty"
			name="ICBM"
			:content="`${meta.gallery.location.latitude}, ${meta.gallery.location.longitude}`"
		/>
		<meta
			v-if="meta.gallery && !meta.gallery.empty"
			name="geo.position"
			:content="`${meta.gallery.location.latitude};${meta.gallery.location.longitude}`"
		/>
		<meta
			v-if="meta.gallery && !meta.gallery.empty"
			name="geo.region"
			:content="`${meta.gallery.location.country}${
				meta.gallery.location.state ? `-${meta.gallery.location.state}` : ''
			}`"
		/>
		<!-- TODO: ^ the state and country should both be 2-letter abbreviations -->
		<meta
			v-if="meta.gallery && !meta.gallery.empty"
			name="geo.placename"
			:content="meta.gallery.location.city"
		/>
	</Head>
	<header class="border-b border-red-800 flex items-end justify-between m-auto p-6 pb-0 w-11/12">
		<router-link to="/">
			<h1 class="pb-4 text-5xl text-yellow-900">Paul Reid Photography</h1>
		</router-link>
		<!--
			<nav>
			<router-link to="/">Featured</router-link>
			| <router-link to="/browse">Browse</router-link> |
			<router-link to="/search">Search</router-link>
			</nav>
		-->
	</header>
	<main><router-view /></main>
	<footer class="border-red-800 border-t m-auto p-6 pt-1 text-sm w-11/12">
		<a href="https://github.com/RedGuy12/paul-reid-photography">Source code</a> licensed under
		<a href="https://github.com/RedGuy12/paul-reid-photography/blob/master/LICENSE"
			>the MIT License</a
		>.
		<a href="https://github.com/RedGuy12/paul-reid-photography/tree/master/public/img/photos"
			>All photographs</a
		>
		copyright 2022 Paul Reid,
		<a
			href="https://github.com/RedGuy12/paul-reid-photography/blob/master/public/img/photos/LICENSE"
			>All Rights Reserved</a
		>.
	</footer>
</template>

<script lang="ts">
	import "./assets/tailwind.css";
	import { Vue, Options } from "vue-property-decorator";
	import { Head } from "@vueuse/head";
	import type { HeadInfo, PageMeta } from "./types/head";
	import stripTrailingSlash from "./lib/stripTrailingSlash";

	const SITE_TITLE = "Paul Reid Photography";
	const DEFAULT_HEAD_INFO = {
		page: {
			computedTitle: SITE_TITLE,
			siteTitle: SITE_TITLE,

			url: `https://${window.location.host.split("www.").at(-1)}${stripTrailingSlash(
				window.location.pathname,
			)}`,
		},
	};

	@Options({ components: { Head } })
	export default class App extends Vue {
		public meta: HeadInfo = DEFAULT_HEAD_INFO;

		public override data(): { meta: HeadInfo } {
			return { meta: this.meta };
		}

		public override setPageMeta(info: PageMeta): void {
			if (info.gallery) {
				this.meta.gallery = {
					parent: info.gallery.parent?.slug,

					...(info.gallery.featured
						? {
								empty: false,
								featured: info.gallery.featured.path,

								location: {
									city: info.gallery.featured.city,
									country: info.gallery.featured.country,
									latitude: info.gallery.featured.latitude,
									longitude: info.gallery.featured.longitude,
									state: info.gallery.featured.state,
								},
						  }
						: { empty: true }),
				};
			}

			this.meta.page.description = info.page.description;

			this.meta.page.computedTitle =
				info.page.title ?? "" ? `${info.page.title} | ${SITE_TITLE}` : SITE_TITLE;
		}
	}
</script>
