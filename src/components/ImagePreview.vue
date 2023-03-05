<template>
  <!-- TODO: support setting the item -->
  <!-- TODO: make name and "set"-button only appear on hover -->
  <!-- TODO: support deleting items -->
  <div ref="imageContainer" class="relative">
    <img ref="image" :src="src" alt="first image" class="rounded w-[448px] h-[600px] object-none"/>
    <div class="absolute rounded bg-gray-800/90 bottom-4 right-4 px-4 flex justify-between gap-5">
      <span >{{visibleName}}</span>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import _ from "lodash";


const props = defineProps<{
  src: string,
  imageName: string,
}>();

const visibleName = computed(() => _.upperFirst(_.lowerCase(props.imageName.split('.')[0])))

</script>
