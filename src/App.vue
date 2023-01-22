<template>
  <div>
    <span>Liste der angepassten Bilder</span>
    <div class="flex flex-col">
      <span v-for="imageName in adjustedImages" :key="imageName"> {{imageName}} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {API} from "./services/backend-service";
import {onMounted, ref} from "vue";

const adjustedImages = ref<string[]>([]);

onMounted(async () => {
  const response = await API.getAdjustedImagesImagesAdjustedGet();
  adjustedImages.value = response.data;
})
</script>

<style scoped>
</style>
