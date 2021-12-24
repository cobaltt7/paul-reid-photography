<template>
	<Masonry :galleries="galleries" />
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import type { Gallery } from "../types";
	import Masonry from "../components/Masonry.vue";

	@Component({
		components: { Masonry },
	})
	export default class Post extends Vue {
		/** @readonly */
		@Prop() galleries!: readonly Gallery[];
	}
</script>
