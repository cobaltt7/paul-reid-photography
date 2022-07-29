<!-- @file A list design for galleries. -->

<template>
	<router-link
		v-for="gallery in parentGallery.galleries"
		:key="gallery.slug"
		:to="parentGallery.slug + gallery.slug"
		class="border border-solid border-stone-700 flex group h-48 my-10"
	>
		<div class="mr-4 w-5/12">
			<img class="h-full m-0 w-auto" :src="gallery.featured?.path" />
		</div>
		<div class="bg-stone-700 h-3/4 my-auto w-0.5" />
		<div class="group-hover:text-blue-900 m-0 ml-4 my-auto">
			<h3 class="mt-1 group-hover:text-blue-900">{{ gallery.title }}</h3>
			<p class="mb-1">
				{{ new Date(gallery.firstPhoto?.date).toLocaleString() }}
			</p>
		</div>
	</router-link>
</template>

<script lang="ts">
	import { Prop as Property, Vue } from "vue-property-decorator";
	import type { NestedGallery } from "../../types/galleries";

	export default class GalleryList extends Vue {
		@Property() public readonly parentGallery!: NestedGallery;
	}
</script>
