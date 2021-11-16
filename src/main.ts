import Vue from "vue";
import App from "./App.vue";
import "./lib/registerServiceWorker";
import router from "./lib/router";

new Vue({
	router,
	render: (createElement) => createElement(App),
}).$mount("main");
