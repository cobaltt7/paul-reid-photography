/** @file Define Types for Vue. */

import type { DefineComponent } from "vue";
import type { PageMeta } from "./head";
declare module "*.vue" {
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module "@vue/runtime-core" {
	export interface ComponentCustomProperties {
		setPageMeta?(info: PageMeta): void;
	}
}
