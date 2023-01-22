<template>
  <div class="flex m-1 cursor-pointer hover:bg-neutral-700">
    <span>{{escapedName}}</span>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import _ from "lodash";


const props = defineProps<{
  imageName: string
}>();

const escapedName = computed(() => _.upperFirst(_.lowerCase(props.imageName.split(".")[0])))
</script>

<style scoped>

</style>