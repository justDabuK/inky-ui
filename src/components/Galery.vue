<template>
  <div class="grid grid-cols-3 gap-5">
    <ImagePreview
      v-for="imageName in imageList"
      :key="imageName"
      :src="getOriginalDownloadPath(imageName)"
      :image-name="imageName"
      :disabled="isImagesDisabled"
      @setting-image="isImagesDisabled = true"
      @finished-setting="isImagesDisabled = false"
    />
  </div>
</template>

<script setup lang="ts">
import ImagePreview from "./ImagePreview.vue";
import { getOriginalDownloadPath } from "../services/backend-service";
import { ref } from "vue";

defineProps<{
  imageList: string[],
}>();

const isImagesDisabled = ref(false);
</script>

