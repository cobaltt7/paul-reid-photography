<template>
	<div class="slider-container">
		<a class="prev" @click="prev" href="#">&#10094;</a>
		<transition-group name="fade" tag="div">
			<div v-for="i in [index]" :key="i">
				<img :src="currentImg" class="w-full" />
			</div>
		</transition-group>
		<a class="next" @click="next" href="#">&#10095;</a>
	</div>
</template>
<script lang="ts">
	export default {
		name: "Slider",
		props: ["photos"],
		data: function (): { index: number } {
			return {
				index: 0,
			};
		},

		mounted: function (): void {
			this.startSlide();
		},

		methods: {
			startSlide: function (): void {
				setInterval(this.next, 4000);
			},

			next: function (): void {
				this.index += 1;
			},
			prev: function (): void {
				this.index -= 1;
			},
		},

		computed: {
			currentImg: function (): string {
				return (this.photos as string[])[Math.abs(this.index) % this.photos.length];
			},
		},
	};
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.9s ease;
		overflow: hidden;
		visibility: visible;
		position: absolute;
		opacity: 1;
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
