<!-- @file A home page. -->

<template>Hi</template>

<script lang="ts">
	import { Vue } from "vue-property-decorator";

	export default class Home extends Vue {
		public override mounted(): void {
			this.$root?.setPageMeta?.({ page: { description: "Just another photos site." } });
		}
	}
</script>
