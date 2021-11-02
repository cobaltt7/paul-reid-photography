<template>
	<div id="page">
		<h1>Gallery: {{ gallery.name }}</h1>
		<ImageSlider :photos="gallery.photos" />
	</div>
</template>

<script>
	import ImageSlider from "../components/ImageSlider.vue";
	export default {
		props: ["gallery"],
		components: {
			ImageSlider,
		},
	};
</script>
