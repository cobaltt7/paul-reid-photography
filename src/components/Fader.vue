<template>
	<div class="relative">
		<div
			class="animate-pulse w-full min-h-52 h-1/4 bg-gray-700"
			style="aspect-ratio: 1"
			v-show="!loaded"
		></div>
		<div
			v-for="src in photos"
			:key="src.path"
			class="w-full absolute top-0 ease-linear transition-all duration-700"
			:class="currentImg === src.path ? 'opacity-100 visible' : 'invisible opacity-0'"
			v-show="loaded"
		>
			<button class="nav-btn left-4" @click="prev" href="#">&#10094;</button>
			<img :src="src.path" class="inline-block mx-auto" />
			<button class="nav-btn right-4" @click="next" href="#">&#10095;</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import type { Photo } from "../types";
	import waitForImages from "../lib/waitForImages";

	const PHOTOS_AUTONAV_DELEAY = 10_000;

	@Component
	export default class Fader extends Vue {
		/** @readonly */
		@Prop() photos!: readonly Photo[];
		index = 0;
		loaded = false;
		interval!: NodeJS.Timer;

		async mounted(): Promise<void> {
			await waitForImages(this.$el);
			this.loaded = true;
			this.startSlide();
		}

		get currentImg(): string | undefined {
			return this.photos[Math.abs(this.index) % this.photos.length]?.path;
		}

		startSlide(): void {
			this.interval = setInterval(this.next, PHOTOS_AUTONAV_DELEAY);
		}

		next(): void {
			this.index += 1;
			clearInterval(this.interval);
			this.startSlide();
		}

		prev(): void {
			this.index -= 1;
			clearInterval(this.interval);
			this.startSlide();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.nav-btn {
		@apply h-6 w-6 text-base top-1/2 -translate-y-1/2 font-bold cursor-pointer text-center select-none inline-block absolute text-white rounded-full bg-black;
	}
</style>
