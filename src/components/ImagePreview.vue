<template>
  <!-- TODO: support setting the item -->
  <!-- TODO: make name and "set"-button only appear on hover -->
  <div v-if="imageName" ref="imageContainer" class="relative image-container">
    <img ref="image" :src="getOriginalDownloadPath(imageName)" alt="first image" class="image"/>
    <span class="image-name">{{visibleName}}</span>
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
<style>
.image {
  width: 448px;
  height: 600px;
  border-radius: 5px;
  object-fit: none;
}

.image-name {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: black;
  color: white;
  padding: 0 20px;
  border-radius: 5px;
}
</style>