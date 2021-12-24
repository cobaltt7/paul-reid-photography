import type { VNode } from "vue";
import type Vue from "vue";
import type { Gallery } from ".";

declare global {
	namespace JSX {
		type Element = VNode;
		type ElementClass = Vue;
		interface IntrinsicElements {
			[elem: string]: unknown;
		}
	}
	/** @private - Don't use! Always import `galleries` from `/types/global` instead. */
	const __galleries__: readonly Gallery[];
}

export const galleries = __galleries__;
