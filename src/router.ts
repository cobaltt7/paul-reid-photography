import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Posts from "../views/Posts.vue";
import NotFound from "../views/404.vue";
import Gallery from "../views/Gallery.vue";
import { galleries } from "./types/global";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/posts",
		component: Posts,
		props: { galleries },
	},
];
galleries.forEach((gallery) => {
	routes.push({
		path: "/" + gallery.slug,
		component: Gallery,
		props: { gallery },
	});
});
routes.push({
	path: "*",
	component: NotFound,
});

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
