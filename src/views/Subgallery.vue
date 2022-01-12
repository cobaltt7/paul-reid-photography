<!-- @file A page to navigate a subgallery. -->

<template>
	<main>
		<h2>{{ gallery.title }}</h2>
		<GalleryList :parent-gallery="gallery" />
		<h3>All photos</h3>
		<PhotosSlider :photos="gallery.galleries.map(({ photos }) => photos).flat()" />
	</main>
</template>

<script lang="ts">
	import { Options, Prop as Property, Vue } from "vue-property-decorator";
	import type { NestedGallery } from "../types";
	import GalleryList from "../components/GalleryList.vue";
	import PhotosSlider from "../components/PhotosSlider.vue";

	@Options({ components: { GalleryList, PhotosSlider } })
	export default class SubgalleryPage extends Vue {
		/** @readonly */
		@Property() public gallery!: NestedGallery;
	}
</script>
