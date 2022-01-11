<!-- @file A page to list galleries. -->

<template>
	<div>
		<h2>Home</h2>
		<Masonry :galleries="galleries" />
	</div>
</template>

<script lang="ts">
	import { Component, Prop as Property, Vue } from "vue-property-decorator";
	import type { Gallery } from "../types";
	import Masonry from "../components/GalleriesMasonry.vue";

	@Component({ components: { Masonry } })
	export default class Post extends Vue {
		/** @readonly */
		@Property() public galleries!: readonly Gallery[];
	}
</script>
