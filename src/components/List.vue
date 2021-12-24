<template>
	<div>
		<a
			:href="parentGallery.slug + gallery.slug"
			class="border border-solid border-warmGray-700 h-48 flex m-10 group"
			v-for="gallery in parentGallery.galleries"
			:key="gallery.slug"
		>
			<div class="w-5/12 mr-4">
				<img class="m-0 h-full w-auto" :src="gallery.featured.path" />
			</div>
			<div class="w-0.5 h-3/4 bg-warmGray-700 my-auto"></div>
			<div class="ml-4 m-0 my-auto">
				<h2 class="mt-1 group-hover:text-blue-900">{{ gallery.title }}</h2>
				<p class="mb-1 group-hover:text-warmGray-700">{{ gallery.firstPhoto.date }}</p>
			</div>
		</a>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import type { NestedGallery } from "../types";

	@Component
	export default class List extends Vue {
		/** @readonly */
		@Prop() parentGallery!: NestedGallery;

		mounted(): void {
			//
		}
	}
</script>

<style scoped></style>
