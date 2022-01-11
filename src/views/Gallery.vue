<!-- @file A page to view photos in a single gallery. -->

<template>
	<main>
		<h2 class="mb-0">{{ gallery.title }}</h2>
		<router-link
			v-if="parentGallery"
			class="font-bold inline-block mt-2 text-center text-gray-600 text-sm w-full"
			:to="parentGallery.slug"
		>
			{{ parentGallery.title }}
		</router-link>
		<PhotosSlider :photos="gallery.photos" />
	</main>
</template>

<script lang="ts">
	import { Component, Prop as Property, Vue } from "vue-property-decorator";
	import PhotosSlider from "../components/PhotosSlider.vue";
	import type { ShallowGallery, NestedGallery } from "../types";

	@Component({ components: { PhotosSlider } })
	export default class Gallery extends Vue {
		/** @readonly */
		@Property() public gallery!: ShallowGallery;

		/** @readonly */
		@Property() public parentGallery?: NestedGallery;
	}
</script>
