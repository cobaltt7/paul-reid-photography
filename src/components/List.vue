<template>
	<div>
		<a
			:href="parentGallery.slug+gallery.slug"
			class="border border-solid border-black h-48 flex m-10"
			v-for="gallery in parentGallery.galleries"
			:key="gallery"
		>
			<img class="m-0 h-full w-auto mr-4" :src="gallery.featured.path" />
			<div class="m-0">
				<h2 class="mt-1">{{gallery.title}}</h2>
				<p class="mb-1">{{ gallery.firstPhoto.date }}</p>
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
