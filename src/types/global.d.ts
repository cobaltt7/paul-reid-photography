import Vue, { VNode } from "vue";
import type { Galleries as galleriesType } from ".";

declare global {
	namespace JSX {
		type Element = VNode;
		type ElementClass = Vue;
		interface IntrinsicElements {
			[elem: string]: unknown;
		}
	}
	/** @private - Don't use! Always import `galleries` from `/src/global` instead. */
	const __galleries__: galleriesType;
}

export const galleries = __galleries__;
