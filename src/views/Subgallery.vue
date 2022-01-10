<!-- @file A page to navigate a subgallery. -->

<template>
	<div>
		<h1>{{ gallery.title }}</h1>
		<GalleryList :parent-gallery="gallery" />
		<PhotosFader :photos="gallery.photos" />
	</div>
</template>

<script lang="ts">
	import { Component, Prop as Property, Vue } from "vue-property-decorator";
	import type { NestedGallery } from "../types";
	import GalleryList from "../components/GalleryList.vue";
	import PhotosFader from "../components/PhotosFader.vue";

	@Component({ components: { GalleryList, PhotosFader } })
	export default class SubgalleryPage extends Vue {
		/** @readonly */
		@Property() public gallery!: NestedGallery;
	}
</script>
