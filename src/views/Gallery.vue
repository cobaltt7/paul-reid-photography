<template>
	<div id="page">
		<h1>Gallery: {{ gallery.title }}</h1>
		<Fader :photos="gallery.photos" />
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import Fader from "../components/Fader.vue";
	import type { Gallery } from "../types";

	@Component({
		components: { Fader },
	})
	export default class Post extends Vue {
		/** @readonly */
		@Prop() gallery!: Gallery;
	}
</script>
