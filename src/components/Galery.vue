<template>
  <div class="grid grid-cols-3 gap-5">
    <ImagePreview v-for="imageName in imageList" :key="imageName" :image-name="imageName" />
  </div>
</template>

<script setup lang="ts">
import ImagePreview from "./ImagePreview.vue";

defineProps<{
  imageList: string[],
}>();
</script>

