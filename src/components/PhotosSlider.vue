<!-- @file A slider component for photos -->

<template>
	<vueper-slides
		fade
		fixed-height
		arrows-outside
		autoplay
		bullets-outside
		:duration="10000"
		:pause-on-hover="false"
		:pause-on-touch="false"
		:transition-speed="700"
		class="mb-20 mt-4"
	>
		<vueper-slide v-for="{ path } in photos" :key="path">
			<template #content>
				<div class="flex h-full w-full">
					<img draggable="false" :src="path" class="m-auto" />
					{{path}}
				</div>
			</template>
		</vueper-slide>
	</vueper-slides>
</template>

<script lang="ts">
	import { Component, Prop as Property, Vue } from "vue-property-decorator";
	import type { Photo } from "../types";
	import { VueperSlide, VueperSlides } from "vueperslides";
	import "vueperslides/dist/vueperslides.css";

	@Component({ components: { VueperSlide, VueperSlides } })
	export default class PhotosSlider extends Vue {
		/** @readonly */
		@Property() public photos!: readonly Photo[];
		mounted() {
			console.log(this.photos[0]);
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.vueperslides--fixed-height {
		@apply h-[50rem];
	}
</style>
