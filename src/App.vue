<!-- @file The template for all pages. -->

<template>
	<body>
		<header
			class="border-b border-red-800 flex items-end justify-between m-auto p-6 pb-0 w-11/12"
		>
			<h1 class="pb-4 text-5xl text-yellow-900">Paul Reid Photography</h1>
			<!--
			  <nav>
			  <router-link to="/">Featured</router-link>
			  | <router-link to="/browse">Browse</router-link> |
			  <router-link to="/search">Search</router-link>
			  </nav>
			-->
		</header>
		<main>
			<router-view />
		</main>
	</body>
</template>

<script lang="ts">
	import "./assets/tailwind.css";
	import { Component, Vue } from "vue-property-decorator";

	@Component
	export default class App extends Vue {}
</script>
