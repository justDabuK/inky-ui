<template>
  <div class="flex flex-col">
    <div class="flex flex-col">
      <image-item v-for="imageName in paginatedList" :key="imageName" :image-name="imageName" />
    </div>
    <div class="flex justify-between items-center">
      <div class="flex">
        <button class="disabled:opacity-50" @click="previousPage" :disabled="disablePrevious">
          <chevron-left />
        </button>
        <button class="disabled:opacity-50" @click="nextPage" :disabled="disableNext">
          <chevron-right />
        </button>
      </div>
      <span >{{`${pageNumber}/${pageCount}`}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageItem from "./ImageItem.vue";
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import {computed, ref} from "vue";

const props = defineProps<{
  imageNameList: string[]
}>();

const pageNumber = ref(0);

const itemsPerPage = 10;

const pageCount = computed(() => Math.ceil(props.imageNameList.length/itemsPerPage))

const disablePrevious = computed(() => pageNumber.value === 0);
const disableNext = computed(() => pageNumber.value === pageCount.value);

const paginatedList = computed(() => {
  const start = pageNumber.value * itemsPerPage;
  const end = start + itemsPerPage;
  return props.imageNameList.slice(start, end);
})

function nextPage() {
  pageNumber.value++;
}

function previousPage() {
  pageNumber.value--;
}

</script>

<style scoped>

</style>