<template>
	<!-- <List galleries="galleries"/> -->
	<div style="display: grid; grid-template-columns: repeat(3, 1fr); grid-gap: 20px">
		<div v-for="i in hi" @click="log({ $refs })" class="inline-block border" :key="i">
			{{ i }}
		</div>
		{{ h() }}
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	// import List from "../components/List.vue";

	@Component
	export default class App extends Vue {
		hi: any[] = [];
		mounted(): void {
			for (let i = 0; i < 20; i++) {
				this.hi.push(i);
				this.$refs;
			}
		}
		log = console.log;
		h() {
			return window.innerHeight;
		}
		// List = List;
	}
</script>

<style scoped>
	.border {
		border: 1px solid black;
	}
</style>
