<template>
  <!-- TODO: make name and "set"-button only appear on hover -->
  <!-- TODO: support deleting items -->
  <div
    ref="imageContainer"
    class="image-container"
    :style="`grid-row: span ${desiredContainerHeight / 10}`"
  >
    <!-- TODO: get rid of tailwind here and calculate the image size based on the input-->
    <img ref="image" :src="src" alt="first image" />
    <div class="name-container">
      <span>{{ visibleName }}</span>
      <slot />
    </div>
    <!-- TODO: allow this only for the gallery preview -->
    <BaseButton
      class="action-button"
      primary
      :loading="isSetting"
      :disabled="disabled"
      @click="setImage"
    >
      <Eye />
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import _ from 'lodash';
import BaseButton from './base/BaseButton.vue';
import Eye from 'vue-material-design-icons/Eye.vue';
import { API } from '../services/backend-service';

const props = defineProps<{
  src: string;
  imageName: string;
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
  await API.setImageImagesSetImageNamePut(props.imageName);
  emit('finished-setting');
  isSetting.value = false;
};

const isLoading = ref(true);

const image = ref<HTMLImageElement | null>(null);
const imageContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (image.value) {
    image.value.onload = () => {
      isLoading.value = false;
    };
  }
});

const containerWidthToActualWidthRatio = computed(() =>
  image.value && imageContainer.value
    ? imageContainer.value.clientWidth / image.value.naturalWidth
    : 0
);

const desiredContainerHeight = computed(() => {
  if (isLoading.value) {
    return 700;
  }
  if (image.value) {
    return (
      Math.ceil(
        (image.value.naturalHeight * containerWidthToActualWidthRatio.value) /
          10
      ) * 10
    );
  }
  return 0;
});
</script>

<style scoped>
.image-container {
  position: relative;
  display: grid;
  place-items: center;
  background-color: var(--background-color-lighter);
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 0.5rem;
}

img {
  border-radius: 0.25rem;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

.name-container {
  position: absolute;
  border-radius: 0.25rem;
  background-color: var(--secondary-color-transparent);
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  gap: 1.25rem;
}

.action-button {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
}
</style>
