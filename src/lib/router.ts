/** @file Route Paths to views. */

import Vue from "vue";
import VueRouter from "vue-router";

// TODO: import Home from "../views/Home.vue";
import { galleries } from "../types/global";
import GalleryView from "../views/Gallery.vue";
import PostsView from "../views/List.vue";
import NotFoundView from "../views/NotFound.vue";
import SubgalleryView from "../views/Subgallery.vue";

import type { Gallery, NestedGallery } from "../types";
import type { RouteConfig } from "vue-router";

Vue.use(VueRouter);

/** @todo Move To fetchGalleries.js. */
const SLUGS: string[] = [];

function generateSlug(slug: string): string {
	const generatedSlug =
		slug +
		(SLUGS.includes(slug) ? `-${SLUGS.filter((used) => used.startsWith(slug)).length}` : "");

	SLUGS.push(generatedSlug);

	return generatedSlug;
}

function createGalleryRoutes(
	sourceGalleries: readonly Gallery[],
	parentGallery?: NestedGallery,
): RouteConfig[] {
	const result: RouteConfig[] = [];

	for (const gallery of sourceGalleries) {
		const hasChildren = !parentGallery && "galleries" in gallery;

		result.push({
			component: hasChildren ? SubgalleryView : GalleryView,
			path: generateSlug((parentGallery?.slug ?? "") + gallery.slug),
			// eslint-disable-next-line unicorn/prevent-abbreviations -- We didn't name this.
			props: { gallery, parentGallery },
		});

		if (hasChildren) result.push(...createGalleryRoutes(gallery.galleries, gallery));
	}

	return result;
}

const router = new VueRouter({
	base: process.env.BASE_URL ?? "",
	mode: "history",

	routes: [
		{
			path: generateSlug("/"),

			// / component: Home,
			// / },
			// / {
			// / path: generateSlug("/all"),

			// eslint-disable-next-line sort-keys -- it's not sorted so un-commenting-out the above lines work.
			component: PostsView,
			// eslint-disable-next-line unicorn/prevent-abbreviations -- We didn't name this.
			props: { galleries },
		},
		...createGalleryRoutes(galleries),
		{
			component: NotFoundView,
			path: "*",
		},
	],
});

export default router;
