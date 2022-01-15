/** @file Render Page. */

import { createHead } from "@vueuse/head";
import { createApp } from "vue";

import App from "./App.vue";
// eslint-disable-next-line import/no-unassigned-import -- This is not a module.
import "./lib/registerServiceWorker";
import router from "./lib/router";

const app = createApp(App);
const head = createHead();

app.use(head);
app.use(router);
app.mount("body");
