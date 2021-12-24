import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// import Home from "../views/Home.vue";
import PostsView from "../views/List.vue";
import NotFoundView from "../views/404.vue";
import GalleryView from "../views/Gallery.vue";
import SubgalleryView from "../views/Subgallery.vue";
import { galleries } from "../types/global";
import type { Gallery, NestedGallery } from "../types";

Vue.use(VueRouter);

const SLUGS: string[] = [];

function generateSlug(slug: string): string {
	if (SLUGS.includes(slug)) slug += "-" + SLUGS.filter((s) => s.startsWith(slug)).length;

	SLUGS.push(slug);
	return slug;
}

function generateGalleryRoutes(
	galleriesToGenerateRoutes: readonly Gallery[],
	parentGallery?: NestedGallery,
) {
	const result: RouteConfig[] = [];
	galleriesToGenerateRoutes.forEach((gallery) => {
		const hasChildren = !parentGallery && gallery.galleries;
		result.push({
			path: generateSlug((parentGallery?.slug || "") + gallery.slug),
			component: hasChildren ? SubgalleryView : GalleryView,
			props: { gallery, parentGallery },
		});
		if (hasChildren) {
			result.push(...generateGalleryRoutes(gallery.galleries, gallery));
		}
	});
	return result;
}

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: generateSlug("/"),
			// 	component: Home,
			// },
			// {
			// 	path: generateSlug("/all"),
			component: PostsView,
			props: { galleries },
		},
		...generateGalleryRoutes(galleries),
		{
			path: "*",
			component: NotFoundView,
		},
	],
});

export default router;
