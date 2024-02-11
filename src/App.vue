<template>
  <h1>Inky UI</h1>
  <div class="site-container">
    <FileInput
      :existing-image-names="originalImages"
      :width="displayResolution.width"
      :height="displayResolution.height"
      @uploaded-files="updateLists"
    />
    <ImageList
      :image-name-list="originalImages"
      :width="displayResolution.width"
      :height="displayResolution.height"
    />
  </div>
</template>

<script setup lang="ts">
import { API } from './services/backend-service';
import { onMounted, ref } from 'vue';
import ImageList from './components/ImageList.vue';
import FileInput from './components/FileInput.vue';

const originalImages = ref<string[]>([]);

const WIDTH_INDEX = 1;
const HEIGHT_INDEX = 0;
const displayResolution = ref<{ width: number; height: number }>({
  width: 448,
  height: 600,
});

const loadResolution = async () => {
  const resolutionList = (await API.getScreenResolutionScreenResolutionGet())
    .data;
  displayResolution.value.height = resolutionList[WIDTH_INDEX];
  displayResolution.value.width = resolutionList[HEIGHT_INDEX];
};

const updateLists = async () => {
  originalImages.value = (
    await API.getOriginalImagesImagesOriginalGet()
  ).data.sort();
};

onMounted(() => {
  loadResolution();
  updateLists();
});
</script>

<style scoped>
.site-container {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

h1 {
  font-size: 3rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}
</style>
