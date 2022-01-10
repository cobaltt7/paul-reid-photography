<!-- @file The template for all pages. -->

<template>
	<main>
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div>
		<router-view />
	</main>
</template>

<script lang="ts">
	import "./assets/tailwind.css";
	import { Component, Vue } from "vue-property-decorator";

	@Component
	export default class App extends Vue {}
</script>
