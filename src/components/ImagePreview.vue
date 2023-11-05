<template>
  <!-- TODO: make name and "set"-button only appear on hover -->
  <!-- TODO: support deleting items -->
  <div ref="imageContainer" class="relative">
    <!-- TODO: get rid of tailwind here and calculate the image size based on the input-->
    <img
      ref="image"
      :src="src"
      alt="first image"
      :class="`${classMap[width > 450 ? 'big' : 'small']}`"
    />
    <div
      class="absolute rounded bg-gray-800/90 top-4 right-4 px-4 flex justify-between gap-5"
    >
      <span>{{ visibleName }}</span>
      <slot />
    </div>
    <!-- TODO: allow this only for the gallery preview -->
    <BaseButton
      class="absolute bottom-4 right-4"
      primary
      :loading="isSetting"
      :disabled="disabled || !adjustedImageName"
      @click="setImage"
    >
      <Eye />
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import _ from 'lodash';
import BaseButton from './base/BaseButton.vue';
import Eye from 'vue-material-design-icons/Eye.vue';
import { API } from '../services/backend-service';

const props = defineProps<{
  src: string;
  imageName: string;
  adjustedImageName?: string;
  disabled?: boolean;
  width: number;
  height: number;
}>();

const emit = defineEmits<{
  (evt: 'setting-image'): void;
  (evt: 'finished-setting'): void;
}>();

const visibleName = computed(() =>
  _.upperFirst(_.lowerCase(props.imageName.split('.')[0]))
);

const isSetting = ref(false);

const setImage = async () => {
  isSetting.value = true;
  emit('setting-image');
  await API.setImageImagesSetImageNamePut(props.adjustedImageName);
  emit('finished-setting');
  isSetting.value = false;
};

const classMap = {
  small: 'rounded w-[448px] h-[600px] object-none',
  big: 'rounded w-[480px] h-[800px] object-none',
};
</script>
