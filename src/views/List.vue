<!-- @file A page to list galleries. -->

<template>
	<h2>Home</h2>
	<Masonry :galleries="galleries" />
</template>

<script lang="ts">
	import { Options, Prop as Property, Vue } from "vue-property-decorator";
	import type { Gallery } from "../types";
	import Masonry from "../components/GalleriesMasonry.vue";

	@Options({ components: { Masonry } })
	export default class Post extends Vue {
		/** @readonly */
		@Property() public galleries!: readonly Gallery[];
	}
</script>
