/** @file Define Types for Vue. */

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

import type { PageMeta } from "./head";
declare module "@vue/runtime-core" {
	export interface ComponentCustomProperties {
		setPageMeta?(info: PageMeta): void;
	}
}
