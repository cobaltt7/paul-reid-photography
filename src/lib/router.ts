import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Posts from "../views/List.vue";
import NotFound from "../views/404.vue";
import Gallery from "../views/Gallery.vue";
import Subgallery from "../views/Subgallery.vue";
import { galleries } from "../types/global";
import type { Galleries, NestedGallery } from "../types";

Vue.use(VueRouter);

function generateGalleryRoutes(
	galleriesToGenerateRoutes: Galleries,
	parentGallery ?: NestedGallery
) {
	const result: RouteConfig[] = [];
	galleriesToGenerateRoutes.forEach((gallery) => {
		const hasChildren = !parentGallery && gallery.galleries;
		result.push({
			path: (parentGallery?.slug ||"")+ gallery.slug,
			component: hasChildren ? Subgallery : Gallery,
			props: { gallery,parentGallery },
		});
		if (hasChildren) {
			result.push(
				...generateGalleryRoutes(gallery.galleries,  gallery
				),
			);
		}
	});
	return result;
}

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			component: Home,
		},
		{
			path: "/posts",
			component: Posts,
			props: { galleries },
		},
		...generateGalleryRoutes(galleries),
		{
			path: "*",
			component: NotFound,
		},
	],
});

export default router;
