<template>
  <div>
    <span>Liste der angepassten Bilder</span>
    <image-list :image-name-list="adjustedImages" />
  </div>
</template>

<script setup lang="ts">
import {API} from "./services/backend-service";
import {onMounted, ref} from "vue";
import ImageList from "./components/ImageList.vue";

const adjustedImages = ref<string[]>([]);

onMounted(async () => {
  const response = await API.getAdjustedImagesImagesAdjustedGet();
  adjustedImages.value = response.data;
})
</script>

<style scoped>
</style>
