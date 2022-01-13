<!-- @file The template for all pages. -->

<template>
	<body>
		<header
			class="border-b border-red-800 flex items-end justify-between m-auto p-6 pb-0 w-11/12"
		>
			<router-link to="/">
				<h1 class="pb-4 text-5xl text-yellow-900">Paul Reid Photography</h1>
			</router-link>
			<!--
			  <nav>
			  <router-link to="/">Featured</router-link>
			  | <router-link to="/browse">Browse</router-link> |
			  <router-link to="/search">Search</router-link>
			  </nav>
			-->
		</header>
		<main><router-view /></main>
		<footer class="border-red-800 border-t m-auto p-6 pt-1 text-sm w-11/12">
			<a href="https://github.com/RedGuy12/paul-reid-photography">Source code</a> licensed
			under
			<a href="https://github.com/RedGuy12/paul-reid-photography/blob/master/LICENSE"
				>the MIT License</a
			>.
			<a
				href="https://github.com/RedGuy12/paul-reid-photography/tree/master/public/img/photos"
				>All photographs</a
			>
			copyright 2022 Paul Reid,
			<a
				href="https://github.com/RedGuy12/paul-reid-photography/blob/master/public/img/photos/LICENSE"
				>All Rights Reserved</a
			>.
		</footer>
	</body>
</template>

<script lang="ts">
	import "./assets/tailwind.css";
	import { Vue } from "vue-property-decorator";

	export default class App extends Vue {}
</script>
