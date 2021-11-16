<template>
	<div id="page">
		<h1>Gallery: {{ gallery.title }}</h1>
		<ImageSlider :photos="gallery.photos" />
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import ImageSlider from "../components/Photos.vue";
	import type { Gallery } from "../types";

	@Component({
		components: { ImageSlider },
	})
	export default class Post extends Vue {
		/** @readonly */
		@Prop() gallery!: Gallery;
	}
</script>
