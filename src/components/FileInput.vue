<template>
  <div class="file-upload-container">
    <h2>Image upload</h2>
    <BaseButton primary @click="onPickFile">choose pictures</BaseButton>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      multiple
      @change="onFilePicked"
    />
    <div v-if="imageList.length > 0" class="image-list-container">
      <h3>Files to upload</h3>
      <!-- TODO: why is this not the same as the gallery?-->
      <div class="image-gallery">
        <ImagePreview
          v-for="(url, index) in fileUrlList"
          :key="url"
          :image-name="imageList[index].name"
          :src="url"
          :width="width"
          :height="height"
        >
          <span>({{ sizeInKb(imageList[index]) }} KB)</span>
          <Check v-if="fileAlreadyExists(imageList[index].name)" />
          <Upload v-else />
        </ImagePreview>
      </div>
      <BaseButton
        :disabled="isUploadingImages"
        :loading="isUploadingImages"
        primary
        @click="uploadFiles"
      >
        <span>Upload images</span>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './base/BaseButton.vue';
import ImagePreview from './ImagePreview.vue';
import { ref } from 'vue';
import { API } from '../services/backend-service';
import Check from 'vue-material-design-icons/Check.vue';
import Upload from 'vue-material-design-icons/Upload.vue';

const props = defineProps<{
  existingImageNames: string[];
  width: number;
  height: number;
}>();

const emit = defineEmits<{
  (evt: 'uploaded-files'): void;
}>();
const imageList = ref<File[]>([]);
const fileUrlList = ref<string[]>([]);
const isUploadingImages = ref<boolean>(false);

const fileInput = ref<HTMLInputElement>();

function onPickFile() {
  imageList.value = [];
  fileUrlList.value = [];
  if (fileInput.value) {
    fileInput.value.click();
  }
}

const waitForCondition = (condition: () => boolean) =>
  new Promise((resolve) => {
    const loop = () => (condition() ? resolve(true) : window.setTimeout(loop));
    loop();
  });

function onFilePicked(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files !== null) {
    for (let i = 0; i < files.length; i++) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[i]);
      waitForCondition(() => fileReader.readyState === fileReader.DONE).then(
        () => {
          if (fileReader.result) {
            fileUrlList.value.push(fileReader.result as unknown as string);
          }
          imageList.value.push(files[i]);
        }
      );
    }
  }
}

async function uploadFiles() {
  if (props.existingImageNames.length > 0) {
    isUploadingImages.value = true;
    // TODO: this does not work for some reason
    await Promise.all(
      imageList.value.map<Promise<boolean>>((imageFile) => {
        return new Promise((resolve) => {
          API.uploadFileUploadfilePost(imageFile).then(() => {
            updateExistingImageNames();
            resolve(true);
          });
        });
      })
    );
    isUploadingImages.value = false;
  }
}

async function updateExistingImageNames() {
  emit('uploaded-files');
}

function fileAlreadyExists(name: string) {
  return props.existingImageNames.includes(name);
}

function sizeInKb(file: File) {
  return Math.floor(file.size / 1024);
}
</script>

<style scoped>
.file-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  h2 {
    text-align: center;
  }
}

input {
  display: none;
}

.image-list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  h3 {
    text-align: center;
  }
}

.image-gallery {
  display: grid;
  /* TODO: replace 448 with prover variable */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}
</style>
