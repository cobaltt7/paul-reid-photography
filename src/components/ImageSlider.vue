<template>
	<div class="slider-container">
		<button class="slider-nav-btn left-4" @click="prev" href="#">&#10094;</button>
		<transition-group name="fade" tag="div" class="inline-block">
			<div v-for="src in photos" :key="src">
				<img :src="src" class="w-full" v-show="currentImg===src" />
			</div>
		</transition-group>
		<button class="slider-nav-btn right-4" @click="next" href="#">&#10095;</button>
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

	.prev,
	.next {
		cursor: pointer;
		width: auto;
		padding: 16px;
		color: white;
		font-weight: bold;
		font-size: 18px;
		transition: 0.7s ease;
		border-radius: 0 4px 4px 0;
		text-decoration: none;
		user-select: none;
	}

	.next {
		right: 0;
	}

	.prev {
		left: 0;
	}

	.prev:hover,
	.next:hover {
		background-color: rgba(0, 0, 0, 0.9);
	}
</style>
