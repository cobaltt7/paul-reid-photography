<!-- @file A page to navigate a subgallery. -->

<template>
	<h2>{{ gallery.title }}</h2>
	<GalleryList :parent-gallery="gallery" />
	<h3>All photos</h3>
	<PhotosSlider :photos="gallery.galleries.map(({ photos }) => photos).flat()" />
</template>

<script lang="ts">
	import { Options, Prop as Property, Vue } from "vue-property-decorator";
	import type { NestedGallery } from "../../types/galleries";
	import GalleryList from "../components/GalleryList.vue";
	import PhotosSlider from "../components/PhotosSlider.vue";

	@Options({ components: { GalleryList, PhotosSlider } })
	export default class SubgalleryPage extends Vue {
		@Property() public readonly gallery!: NestedGallery;

		public override mounted(): void {
			this.$root?.setPageMeta?.({
				gallery: { featured: this.gallery.featured },

				page: {
					description: `Browse photos from and nearby ${this.gallery.title}`,
					title: this.gallery.title,
				},
			});
		}
	}
</script>
