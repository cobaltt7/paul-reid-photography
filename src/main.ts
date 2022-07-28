import { createHead } from "@vueuse/head";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./lib/router";

const app = createApp(App);
const head = createHead();

app.use(head);
app.use(router);
app.mount("body");
