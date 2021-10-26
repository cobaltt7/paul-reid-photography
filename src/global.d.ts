import Vue, { VNode } from "vue";
import {galleries} from "./types"

declare global {
	namespace JSX {
		interface Element extends VNode {}
		interface ElementClass extends Vue {}
		interface IntrinsicElements {
			[elem: string]: any;
		}
	};
	readonly const galleries: galleries;
}
