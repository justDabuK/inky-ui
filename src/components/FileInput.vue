<template>
  <div class="flex flex-col gap-5">
    <h2 class="text-xl">Image upload</h2>
    <div>
      <BaseButton @click="onPickFile">choose pictures</BaseButton>
    </div>

    <input ref="fileInput" type="file" class="hidden" accept="image/*" multiple @change="onFilePicked"/>
    <div v-if="imageList.length > 0" class="flex flex-col gap-10">
      <span>Files to upload</span>
      <div class="grid grid-cols-3 gap-5">
        <ImagePreview v-for="(url, index) in fileUrlList" :key="url" :image-name="imageList[index].name" :src="url" >
          <span>({{sizeInKb(imageList[index])}} KB)</span>
          <Check v-if="fileAlreadyExists(imageList[index].name)" />
          <Upload v-else />
        </ImagePreview>
      </div>
      <BaseButton :disabled="isUploadingImages" :loading="isUploadingImages" @click="uploadFiles">
        <span>Upload images</span>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "./base/BaseButton.vue";
import ImagePreview from "./ImagePreview.vue";
import { ref } from "vue";
import { API } from "../services/backend-service";
import Check from "vue-material-design-icons/Check.vue";
import Upload from "vue-material-design-icons/Upload.vue";

const props = defineProps<{
  existingImageNames: string[],
}>()

const emit = defineEmits<{
  (evt: 'uploaded-files'): void
}>()
const imageList = ref<File[]>([]);
const fileUrlList = ref<(string)[]>([]);
const isUploadingImages = ref<boolean>(false);

const fileInput = ref<HTMLInputElement>();

function onPickFile() {
  imageList.value = [];
  fileUrlList.value = [];
  if(fileInput.value) {
    fileInput.value.click();
  }
}

const waitForCondition = (condition: () => boolean) =>
  new Promise((resolve) => {
    const loop = () =>
      condition() ?
        resolve(true):
        window.setTimeout(loop);
    loop();
  })

function onFilePicked(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if(files !== null) {
    for( let i = 0; i< files.length; i++) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[i]);
      waitForCondition(() => fileReader.readyState === fileReader.DONE).then(() => {
        if(fileReader.result) {
          fileUrlList.value.push(fileReader.result as unknown as string);
        }
        imageList.value.push(files[i])
      });
    }
  }
}

async function uploadFiles() {
  if(props.existingImageNames.length > 0) {
    // TODO: does this work?
    isUploadingImages.value = true;
    await Promise.all(imageList.value.map<Promise<boolean>>((imageFile) => {
      return new Promise((resolve) => {
        API.uploadFileUploadfilePost(imageFile)
          .then(() => API.cropImageForInkyImagesCropImageNamePut(imageFile.name))
          .then(() => {
            updateExistingImageNames();
            resolve(true);
          })
      })
    }));
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