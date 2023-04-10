<template>
  <div class="flex flex-col gap-10">
    <h1 class="text-5xl">Inky UI</h1>
    <FileInput class="mb-8" :existing-image-names="originalImages" @uploaded-files="updateLists"/>
    <ImageList :image-name-list="originalImages" />
  </div>
</template>

<script setup lang="ts">
import {API} from "./services/backend-service";
import {onMounted, ref} from "vue";
import ImageList from "./components/ImageList.vue";
import FileInput from "./components/FileInput.vue";

const adjustedImages = ref<string[]>([]);
const originalImages = ref<string[]>([]);

const updateLists = async () => {
  adjustedImages.value = (await API.getAdjustedImagesImagesAdjustedGet()).data;
  originalImages.value = (await API.getOriginalImagesImagesOriginalGet()).data;
}

onMounted(updateLists)
</script>

<style scoped>
</style>
