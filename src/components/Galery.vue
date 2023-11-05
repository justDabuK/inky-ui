<template>
  <div :class="`grid grid-cols-2 gap-5`">
    <ImagePreview
      v-for="imageName in imageList"
      :key="imageName"
      :src="getOriginalDownloadPath(imageName)"
      :image-name="imageName"
      :adjusted-image-name="findAdjustedImage(imageName)"
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

const props = defineProps<{
  imageList: string[];
  adjustedImageNameList: string[];
  width: number;
  height: number;
}>();

const isImagesDisabled = ref(false);
const findAdjustedImage = (imageName: string) => {
  const imageNameWithoutExtension = imageName.split('.')[0];
  return props.adjustedImageNameList.find((name) =>
    name.startsWith(imageNameWithoutExtension)
  );
};
</script>
