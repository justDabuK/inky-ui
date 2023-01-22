<template>
  <div class="flex flex-col">
    <file-input class="mb-8"/>
    <span>Liste der angepassten Bilder</span>
    <image-list :image-name-list="adjustedImages" />
  </div>
</template>

<script setup lang="ts">
import {API} from "./services/backend-service";
import {onMounted, ref} from "vue";
import ImageList from "./components/ImageList.vue";
import FileInput from "./components/FileInput.vue";

const adjustedImages = ref<string[]>([]);

onMounted(async () => {
  const response = await API.getAdjustedImagesImagesAdjustedGet();
  adjustedImages.value = response.data;
})
</script>

<style scoped>
</style>
