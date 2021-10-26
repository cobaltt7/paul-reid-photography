<template>
  <div>
    <h1>Gallery: {{ gallery.name }}</h1>
    <ImageSlider :photos="gallery.photos"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ImageSlider from '@/components/ImageSlider.vue'
  export default {
props:["gallery"],
  components: {
    ImageSlider
  }
    }
</script>
