<template>
  <div class="gallery">
    <ImagePreview
      v-for="imageName in imageList"
      :key="imageName"
      :src="getOriginalDownloadPath(imageName)"
      :image-name="imageName"
      :disabled="isImagesDisabled"
      :width="width"
      :height="height"
      @setting-image="isImagesDisabled = true"
      @finished-setting="isImagesDisabled = false"
    />
  </div>
</template>

<script setup lang="ts">
import ImagePreview from './ImagePreview.vue';
import { getOriginalDownloadPath } from '../services/backend-service';
import { ref } from 'vue';

defineProps<{
  imageList: string[];
  width: number;
  height: number;
}>();

const isImagesDisabled = ref(false);
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>
