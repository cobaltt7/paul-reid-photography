<!-- @file A page to view photos in a single gallery. -->

<template>
	<div id="page">
		<h2 class="mb-0">{{ gallery.title }}</h2>
		<router-link
			v-if="parentGallery"
			class="font-bold inline-block mt-2 text-center text-gray-600 text-sm w-full"
			:to="parentGallery.slug"
			>
{{ parentGallery.title }}
</router-link
		>
		<PhotosFader :photos="gallery.photos" />
	</div>
</template>

<script lang="ts">
	import { Component, Prop as Property, Vue } from "vue-property-decorator";
	import PhotosFader from "../components/PhotosFader.vue";
	import type { ShallowGallery, NestedGallery } from "../types";

	@Component({ components: { PhotosFader } })
	export default class Gallery extends Vue {
		/** @readonly */
		@Property() public gallery!: ShallowGallery;

		/** @readonly */
		@Property() public parentGallery?: NestedGallery;
	}
</script>
