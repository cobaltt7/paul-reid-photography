<template>
	<div class="relative w-full">
		<div v-for="src in photos" :key="src" class="w-full absolute top-0"
				:class="currentImg === src ? 'opacity-100 visible' : 'invisible opacity-0'">
			<button class="slider-nav-btn left-4" @click="prev" href="#">&#10094;</button>
			<img
				:src="src"
				class="inline-block w-full"
			/>
			<button class="slider-nav-btn right-4" @click="next" href="#">&#10095;</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";

	@Component
	export default class Slider extends Vue {
		@Prop() photos!: string[];
		index = 0;
		interval!: number;

		get currentImg(): string {
			return this.photos[Math.abs(this.index) % this.photos.length];
		}

		startSlide(): void {
			// this.interval=setInterval(this.next, 6000);
		}

		next(): void {
			this.index += 1;
		}

		prev(): void {
			this.index -= 1;
		}

		mounted(): void {
			this.startSlide();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.9s ease;
		overflow: hidden;
		visibility: visible;
		position: absolute;
		opacity: 1;
		width: 70vw;
	}

	.fade-enter,
	.fade-leave-to {
		visibility: hidden;
		opacity: 0;
	}

	.slider-nav-btn {
		@apply h-6 w-6 text-base top-1/2 -translate-y-1/2 font-bold cursor-pointer text-center select-none inline-block absolute text-white rounded-full bg-black;
	}
</style>
