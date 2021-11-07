import Vue, { VNode } from "vue";
import type { galleries as galleriesType } from "./types";

declare global {
	namespace JSX {
		type Element = VNode;
		type ElementClass = Vue;
		interface IntrinsicElements {
			[elem: string]: unknown;
		}
	}
	const __galleries__: galleriesType;
}

export const galleries = __galleries__;
