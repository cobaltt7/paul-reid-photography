<!-- @file A list design for galleries. -->

<template>
	<div>
		<router-link
			v-for="gallery in parentGallery.galleries"
			:key="gallery.slug"
			:to="parentGallery.slug + gallery.slug"
			class="border border-solid border-stone-700 flex group h-48 m-10"
		>
			<div class="mr-4 w-5/12">
				<img class="h-full m-0 w-auto" :src="gallery.featured.path" />
			</div>
			<div class="bg-stone-700 h-3/4 my-auto w-0.5" />
			<div class="m-0 ml-4 my-auto">
				<h3 class="group-hover:text-blue-900 mt-1">{{ gallery.title }}</h3>
				<p class="group-hover:text-stone-700 mb-1">{{ gallery.firstPhoto.date }}</p>
			</div>
		</router-link>
	</div>
</template>

<script lang="ts">
	import { Component, Prop as Property, Vue } from "vue-property-decorator";
	import type { NestedGallery } from "../types";

	@Component
	export default class GalleryList extends Vue {
		/** @readonly */
		@Property() public parentGallery!: NestedGallery;
	}
</script>
