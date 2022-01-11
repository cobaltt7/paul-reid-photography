<!-- @file A masonry design for galleries. -->

<template>
	<div>
		<!-- Sizing helper - This is never show to the user. -->
		<div ref="spacerElement" style="width: var(--gallery-item-width)" />
		<div ref="grid">
			<router-link
				v-for="i in galleries"
				:key="i.slug"
				style="width: var(--gallery-item-width);"
				class="gallery group inline-block"
				:to="i.slug"
			> <!-- card -->
				<div
				style="transform-style: preserve-3d;"
				class="transition-all duration-500 relative">
					<img class="m-0" :src="i.featured.path" /> <!-- front-->
					<div class="absolute w-full bottom-0 " style="transform: rotateY(180deg);"> <!-- back-->
					<div class="m-5 bg-white rounded-lg bg-opacity-75 text-center group-hover:text-warmGray-700">
						<h6>{{ i.title }}</h6>
						<i>{{ new Date(i.firstPhoto.date).toLocaleString() }}</i></div>
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Prop as Property, Vue } from "vue-property-decorator";
	import type { Gallery } from "../types";
	import Masonry from "masonry-layout";
	import waitForImages from "../lib/waitForImages";

	@Component
	export default class GalleriesMasonry extends Vue {
		/** @readonly */
		@Property() public galleries!: readonly Gallery[];

		public async mounted(): Promise<void> {
			console.log(this.galleries[0])
			const { grid, spacerElement } = this.$refs;

			if (!(grid instanceof Element)) throw new Error("Grid element not found");

			await waitForImages(grid);

			if (!(spacerElement instanceof HTMLDivElement))
				throw new Error("Spacer element not found");

			new Masonry(grid, {
				columnWidth: spacerElement.getBoundingClientRect().width,
				gutter: 0,
				horizontalOrder: true,
				itemSelector: ".gallery",
				percentPosition: true,
				transitionDuration: 0,
			}).layout?.();
		}
	}
</script>

<style>
	:root {
		/* todo: use `scoped` and define the properties on the component root element
		 This determines the width of each block. */
		--gallery-item-width: calc(100% / var(--column-count));

		--column-count: 3;
	}

	.gallery:hover > div {
		transform: rotateY(180deg);
	}
</style>
