<template>
  <div class="flex justify-between">
    <span>{{file.name}}</span>
    <span>({{sizeInKb}} KB)</span>
    <check v-if="fileAlreadyExists" />
    <upload v-else />
  </div>
</template>

<script setup lang="ts">
import {computed } from "vue";
import Check from "vue-material-design-icons/Check.vue";
import Upload from "vue-material-design-icons/Upload.vue";

const props = defineProps<{
  file: File
  existingImageNames: string[]
}>()

const fileAlreadyExists = computed(() => props.existingImageNames.includes(props.file.name));

const sizeInKb = computed(() => Math.floor(props.file.size/1024))



</script>