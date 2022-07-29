<!-- @file A page to view photos in a single gallery. -->

<template>
	<h2 class="mb-0">{{ gallery.title }}</h2>
	<router-link
		v-if="parentGallery"
		class="font-bold inline-block mt-2 text-center text-sm text-zinc-600 w-full"
		:to="parentGallery.slug"
	>
		{{ parentGallery.title }}
	</router-link>
	<PhotosSlider :photos="gallery.photos" />
</template>

<script lang="ts">
	import { Options, Prop as Property, Vue } from "vue-property-decorator";
	import PhotosSlider from "../components/PhotosSlider.vue";
	import type { ShallowGallery, NestedGallery } from "../../types/galleries";

	@Options({ components: { PhotosSlider } })
	export default class Gallery extends Vue {
		@Property() public readonly gallery!: ShallowGallery;

		@Property() public readonly parentGallery?: NestedGallery;

		public override mounted(): void {
			this.$root?.setPageMeta?.({
				gallery: {
					featured: this.gallery.featured,
					parent: this.parentGallery,
				},

				page: {
					description: `View photos from ${this.gallery.title}${
						this.parentGallery ? ` (${this.parentGallery.title})` : ""
					}`,

					title:
						this.gallery.title +
						(this.parentGallery ? ` | ${this.parentGallery.title}` : ""),
				},
			});
		}
	}
</script>
