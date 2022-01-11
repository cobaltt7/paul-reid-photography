/** @file Render Page. */

import Vue from "vue";

import App from "./App.vue";
// eslint-disable-next-line import/no-unassigned-import -- This is not a module.
import "./lib/registerServiceWorker";
import router from "./lib/router";

import type { VNode as VueNode } from "vue";

new Vue({
	render: (createElement): VueNode => createElement(App),
	router,
}).$mount("body");
