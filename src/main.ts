/** @file Render Page. */

import { createApp } from "vue";

import App from "./App.vue";
// eslint-disable-next-line import/no-unassigned-import -- This is not a module.
import "./lib/registerServiceWorker";
import router from "./lib/router";

const app = createApp(App);
app.use(router);
app.mount("body");
