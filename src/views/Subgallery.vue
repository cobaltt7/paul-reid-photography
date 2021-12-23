<template>
	<div>
		<h1>{{ gallery.title }}</h1>
		<List :parentGallery="gallery" />
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import type { NestedGallery } from "../types";
	import List from "../components/List.vue";

	@Component({
		components: { List },
	})
	export default class Subgallery extends Vue {
		/** @readonly */
		@Prop() gallery!: NestedGallery;
	}
</script>
