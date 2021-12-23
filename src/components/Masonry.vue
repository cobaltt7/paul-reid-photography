<template>
	<div>
		<!-- Sizing helpers - These are never show to the user. -->
		<div ref="galleryItemSize" style="width: var(--gallery-item-width)"></div>
		<div ref="gutterSize" class="w-5"></div>
		<div ref="grid">
			<a
				v-for="i in galleries"
				:data-index="i"
				style="margin-bottom: var(--gutter-size); width: var(--gallery-item-width)"
				class="inline-block border border-solid border-black group gallery"
				:key="i.slug"
				:href="i.slug"
				><h6 class="group-hover:no-underline">
					{{ i.title }}
				</h6>
				<img :src="i.featured.path" />
				<i class="group-hover:text-[color:inherit]">{{ i.firstPhoto.date }}</i>
			</a>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import type { Galleries } from "../types";
	import Masonry from "masonry-layout";
	import waitForImages from "../lib/waitForImages";

	@Component
	export default class List extends Vue {
		/** @readonly */
		@Prop() galleries!: Galleries;

		async mounted(): Promise<void> {
			const grid = this.$refs.grid;
			if (!(grid instanceof Element)) throw new Error("Grid element not found");
			await waitForImages(grid);

			const gutterSize = (
				this.$refs.gutterSize as HTMLDivElement | undefined
			)?.getBoundingClientRect().width;
			if (typeof gutterSize !== "number") throw new Error("Spacer element not found");
			document.documentElement.style.setProperty("--gutter-size", gutterSize + "px");

			const spacerElement = this.$refs.galleryItemSize;
			if (!(spacerElement instanceof HTMLDivElement))
				throw new Error("Spacer element not found");

			new Masonry(grid, {
				itemSelector: ".gallery",
				columnWidth: spacerElement.getBoundingClientRect().width,
				percentPosition: true,
				gutter: gutterSize,
				horizontalOrder: true,
				transitionDuration: 0,
			}).layout?.();
		}
	}
</script>

<style>
	:root {
		/* (full width - (gutter size * (column count - 1))) divided into x columns */
		/* This determines the width of each block. */
		--gallery-item-width: calc(
			(100% - var(--gutter-size) * (var(--column-count) - 1)) / var(--column-count)
		);

		--column-count: 4;
	}
</style>
