<!-- @file A fader component for photos -->

<template>
	<div class="relative">
		<div
			v-show="!loaded"
			class="animate-pulse bg-gray-700 h-1/4 min-h-52 w-full"
			style="aspect-ratio: 1"
		/>
		<div
			v-for="src in photos"
			v-show="loaded"
			:key="src.path"
			class="absolute duration-700 ease-linear top-0 transition-all w-full"
			:class="currentImg === src.path ? 'opacity-100 visible' : 'invisible opacity-0'"
		>
			<button class="left-4 nav-btn" href="#" type="button" @click="previous">
				&#10094;
			</button>
			<img :src="src.path" class="inline-block mx-auto" />
			<button class="nav-btn right-4" href="#" type="button" @click="next">&#10095;</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Prop as Property, Vue } from "vue-property-decorator";
	import type { Photo } from "../types";
	import waitForImages from "../lib/waitForImages";

	const AUTO_NEXT_DELAY = 10_000;

	@Component
	export default class PhotosFader extends Vue {
		/** @readonly */
		@Property() public photos!: readonly Photo[];

		public index = 0;

		public loaded = false;

		private interval: NodeJS.Timer | undefined;

		public get currentImg(): string | undefined {
			return this.photos[Math.abs(this.index) % this.photos.length]?.path;
		}

		public startSlide(): void {
			this.interval = setInterval(this.next, AUTO_NEXT_DELAY);
		}

		public stopSlide(): void {
			if (this.interval) clearInterval(this.interval);

			this.interval = undefined;
		}

		public previous(): void {
			this.index -= 1;
			this.stopSlide();
			this.startSlide();
		}

		public next(): void {
			this.index += 1;
			this.stopSlide();
			this.startSlide();
		}

		public async mounted(): Promise<void> {
			await waitForImages(this.$el);
			this.loaded = true;
			this.startSlide();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/* todo: move this to other component */
	.nav-btn {
		@apply h-6 w-6 text-base top-1/2 -translate-y-1/2 font-bold cursor-pointer text-center select-none inline-block absolute text-white rounded-full bg-black;
	}
</style>
