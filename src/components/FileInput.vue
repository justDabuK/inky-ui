<template>
  <div>
    <base-button @click="onPickFile">choose pictures</base-button>
    <input ref="fileInput" type="file" class="hidden" accept="image/*" multiple @change="onFilePicked"/>
    <div v-if="imageList.length > 0" class="flex flex-col">
      <span>Files to upload</span>
      <file-item v-for="imageFile in imageList" :key="imageFile.name" :file="imageFile" :existing-image-names="existingImageNames"/>
      <base-button :disabled="uploadingImages" @click="uploadFiles">
        <progress-upload v-if="uploadingImages" />
        <span v-else>Upload images</span>
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "./base/BaseButton.vue";
import FileItem from "./FileItem.vue";
import {onMounted, ref} from "vue";
import {API} from "@/services/backend-service";
import ProgressUpload from "vue-material-design-icons/ProgressUpload.vue"

const imageUrl = ref<string | ArrayBuffer | null>(null);
const imageList = ref<File[]>([]);
const existingImageNames = ref<string[]>([]);
const uploadingImages = ref<boolean>(false);

const fileInput = ref<HTMLInputElement>();

function onPickFile() {
  imageList.value = [];
  if(fileInput.value) {
    fileInput.value.click();
  }
}

function onFilePicked(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if(files !== null) {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      imageUrl.value = fileReader.result;
    })
    fileReader.readAsDataURL(files[0]);
    for( let i = 0; i< files.length; i++) {
      imageList.value.push(files[i]);
    }
  }
}

async function uploadFiles() {
  if(existingImageNames.value.length > 0) {
    uploadingImages.value = true;
    imageList.value.forEach( async (imageFile) => {
      if(!existingImageNames.value.includes(imageFile.name)) {
        try {
          await API.uploadFileUploadfilePost(imageFile);
          await API.cropImageForInkyImagesCropImageNamePut(imageFile.name);
        } finally {
          updateExistingImageNames();
        }
      }
    })
    uploadingImages.value = false;
  }
}

async function updateExistingImageNames() {
  const response = await API.getOriginalImagesImagesOriginalGet();
  existingImageNames.value = response.data;
}

onMounted(updateExistingImageNames);
</script>