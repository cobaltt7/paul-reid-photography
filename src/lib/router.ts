/** @file Route Paths to views. */

import { createRouter, createWebHistory } from "vue-router";

// TODO: import Home from "../views/Home.vue";
import { galleries } from "../../types/global";
import GalleryView from "../views/Gallery.vue";
import PostsView from "../views/List.vue";
import NotFoundView from "../views/NotFound.vue";
import SubgalleryView from "../views/Subgallery.vue";

import type { Gallery, NestedGallery } from "../../types/galleries";
import type { RouteRecordRaw } from "vue-router";

const SLUGS: string[] = [];

/**
 * Affirm that a slug is unique.
 *
 * @param slug - The slug.
 *
 * @returns A unique slug.
 *
 * @todo Move To fetchGalleries.ts.
 */
function generateSlug(slug: string): string {
	const generatedSlug =
		slug +
		(SLUGS.includes(slug) ? `-${SLUGS.filter((used) => used.startsWith(slug)).length}` : "");

	SLUGS.push(generatedSlug);

	return generatedSlug;
}

/**
 * Generate route records for galleries.
 *
 * @param sourceGalleries - The galleries to generate route records for.
 * @param [parentGallery] - The parent gallery if any.
 *
 * @returns The route records.
 */
function createGalleryRoutes(
	sourceGalleries: readonly Gallery[],
	parentGallery?: NestedGallery,
): RouteRecordRaw[] {
	const result: RouteRecordRaw[] = [];

	for (const gallery of sourceGalleries) {
		const hasChildren = !parentGallery && "galleries" in gallery;
		const properties: { [key: string]: unknown } = { gallery };
		if (parentGallery) properties.parentGallery = parentGallery;

		result.push({
			component: hasChildren ? SubgalleryView : GalleryView,
			path: generateSlug((parentGallery?.slug ?? "") + gallery.slug),
			// eslint-disable-next-line unicorn/prevent-abbreviations -- I didn't name this.
			props: properties,
		});

		if (hasChildren) result.push(...createGalleryRoutes(gallery.galleries, gallery));
	}

	return result;
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),

	routes: [
		{
			path: generateSlug("/"),

			// /component: Home,
			// /},
			// /{
			// /path: generateSlug("/browse"),

			// eslint-disable-next-line sort-keys -- it's not sorted so un-commenting-out the above lines work.
			component: PostsView,
			// eslint-disable-next-line unicorn/prevent-abbreviations -- I didn't name this.
			props: { galleries },
		},
		...createGalleryRoutes(galleries),
		{ component: NotFoundView, path: "/:pathMatch(.*)*" },
	],
});

export default router;
