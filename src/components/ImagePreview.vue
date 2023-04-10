<template>
  <!-- TODO: make name and "set"-button only appear on hover -->
  <!-- TODO: support deleting items -->
  <div ref="imageContainer" class="relative">
    <img ref="image" :src="src" alt="first image" class="rounded w-[448px] h-[600px] object-none"/>
    <div class="absolute rounded bg-gray-800/90 top-4 right-4 px-4 flex justify-between gap-5">
      <span >{{visibleName}}</span>
      <slot />
    </div>
    <BaseButton class="absolute bottom-4 right-4" primary :loading="isSetting" :disabled="disabled" @click="setImage">
      <Eye />
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import _ from "lodash";
import BaseButton from "./base/BaseButton.vue";
import Eye from 'vue-material-design-icons/Eye.vue'
import { API } from "../services/backend-service";

const props = defineProps<{
  src: string,
  imageName: string,
  disabled?: boolean,
}>();

const emit = defineEmits<{
  (evt: 'setting-image'): void;
  (evt: 'finished-setting'): void;
}>()

const visibleName = computed(() => _.upperFirst(_.lowerCase(props.imageName.split('.')[0])))

const isSetting = ref(false);

const adjustedImageName = computed(() => {
  const splitName = props.imageName.split(".");
  return `${splitName[0]}_cropped_rotated.${splitName[1]}`
})
const setImage = async () => {
  isSetting.value = true;
  emit('setting-image');
  await API.setImageImagesSetImageNamePut(adjustedImageName.value);
  emit('finished-setting');
  isSetting.value = false;
};

</script>
