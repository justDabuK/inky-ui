<template>
  <div class="flex flex-col gap-5">
    <h2 class="text-xl">Image upload</h2>
    <div>
      <base-button @click="onPickFile">choose pictures</base-button>
    </div>

    <input ref="fileInput" type="file" class="hidden" accept="image/*" multiple @change="onFilePicked"/>
    <div v-if="imageList.length > 0" class="flex flex-col gap-10">
      <span>Files to upload</span>
      <div class="grid grid-cols-3 gap-5">
        <!-- TODO: name and picture mismatch -->
        <image-preview v-for="(url, index) in fileUrlList" :key="url" :image-name="imageList[index].name" :src="url" >
          <span>({{sizeInKb(imageList[index])}} KB)</span>
          <check v-if="fileAlreadyExists(imageList[index].name)" />
          <upload v-else />
        </image-preview>
      </div>
      <base-button :disabled="uploadingImages" @click="uploadFiles">
        <progress-upload v-if="uploadingImages" />
        <span v-else>Upload images</span>
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "./base/BaseButton.vue";
import ImagePreview from "./ImagePreview.vue";
import { ref } from "vue";
import { API } from "../services/backend-service";
import ProgressUpload from "vue-material-design-icons/ProgressUpload.vue"
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
const uploadingImages = ref<boolean>(false);

const fileInput = ref<HTMLInputElement>();

function onPickFile() {
  imageList.value = [];
  fileUrlList.value = [];
  if(fileInput.value) {
    fileInput.value.click();
  }
}

function onFilePicked(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if(files !== null) {
    for( let i = 0; i< files.length; i++) {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        if(fileReader.result) {
          fileUrlList.value.push(fileReader.result as unknown as string);
        }
      });
      fileReader.readAsDataURL(files[i]);
      imageList.value.push(files[i]);
    }
  }
}

async function uploadFiles() {
  if(props.existingImageNames.length > 0) {
    uploadingImages.value = true;
    imageList.value.forEach( async (imageFile) => {
      if(!props.existingImageNames.includes(imageFile.name)) {
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
  emit('uploaded-files');
}

function fileAlreadyExists(name: string) {
  return props.existingImageNames.includes(name);
}

function sizeInKb(file: File) {
  return Math.floor(file.size / 1024);
}
</script>