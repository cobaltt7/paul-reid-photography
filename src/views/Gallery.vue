<template>
	<div id="page">
		<h1>{{ gallery.title }}</h1>
		<a class="text-gray-600 text-sm font-bold" v-if="parentGallery" :href="parentGallery.slug">{{ parentGallery.title }}</a>
		<Fader :photos="gallery.photos" />
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import Fader from "../components/Fader.vue";
	import type { ShallowGallery,NestedGallery } from "../types";

	@Component({
		components: { Fader },
	})
	export default class Post extends Vue {
		/** @readonly */
		@Prop() gallery!: ShallowGallery;

		/** @readonly */
		@Prop() parentGallery?: NestedGallery;
	}
</script>
