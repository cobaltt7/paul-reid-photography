import Vue, { VNode } from "vue";
import { galleries } from "./types";

declare global {
	namespace JSX {
		type Element = VNode;
		type ElementClass = Vue;
		interface IntrinsicElements {
			[elem: string]: any;
		}
	}
	const galleries: galleries;
}
