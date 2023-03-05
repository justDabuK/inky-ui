<template>
  <!-- TODO: support setting the item -->
  <!-- TODO: make name and "set"-button only appear on hover -->
  <div v-if="imageName" ref="imageContainer" class="relative">
    <img ref="image" :src="getOriginalDownloadPath(imageName)" alt="first image" class="rounded w-[448px] h-[600px] object-none"/>
    <span class="image-name absolute rounded bg-gray-800/90 bottom-4 right-4 px-4">{{visibleName}}</span>
  </div>
</template>

<script setup lang="ts">
import {getOriginalDownloadPath} from "../services/backend-service";
import { computed } from "vue";
import _ from "lodash";


const props = defineProps<{
  imageName: string
}>();

const visibleName = computed(() => _.upperFirst(_.lowerCase(props.imageName.split('.')[0])))

</script>
