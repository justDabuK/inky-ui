<template>
  <div class="flex flex-col gap-10">
    <h1 class="text-5xl">Inky UI</h1>
    <file-input class="mb-8"/>
    <image-list :image-name-list="originalImages" />
  </div>
</template>

<script setup lang="ts">
import {API} from "./services/backend-service";
import {onMounted, ref} from "vue";
import ImageList from "./components/ImageList.vue";
import FileInput from "./components/FileInput.vue";

const adjustedImages = ref<string[]>([]);
const originalImages = ref<string[]>([]);

onMounted(async () => {
  adjustedImages.value = (await API.getAdjustedImagesImagesAdjustedGet()).data;
  originalImages.value = (await API.getOriginalImagesImagesOriginalGet()).data;
})
</script>

<style scoped>
</style>
