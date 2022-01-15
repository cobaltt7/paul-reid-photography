/** @file Define Types for various files and modules. */

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module "@vue/runtime-core" {
	import type { PageMeta } from "./head";
	export interface ComponentCustomProperties {
		setPageMeta?(info: PageMeta): void;
	}
}

declare module "@tailwindcss/typography";
declare module "vueperslides";
