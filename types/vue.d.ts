import type { Component } from "@vue/runtime-core";
import type { PageMeta } from "./head";
declare module "**.vue" {
	export default Component;
}

declare module "@vue/runtime-core" {
	export interface ComponentCustomProperties {
		setPageMeta?(info: PageMeta): void;
	}
}
