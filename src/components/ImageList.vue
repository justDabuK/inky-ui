<template>
  <!-- TODO: support searching for an object -->
  <div class="flex flex-col gap-10">
    <div class="flex justify-center">
      <input v-model="searchTerm" placeholder="enter a search term" class="p-2 rounded"/>
    </div>
    <div class="flex justify-between items-center">
      <div class="flex">
        <base-button :disabled="disablePrevious" @click="previousPage">
          <chevron-left />
        </base-button>
        <base-button :disabled="disableNext" @click="nextPage">
          <chevron-right />
        </base-button>
      </div>
      <span >{{`${pageNumber}/${pageCount}`}}</span>
    </div>
    <galery :image-list="paginatedList" />
  </div>
</template>

<script setup lang="ts">
import Galery from "./Galery.vue"
import BaseButton from "./base/BaseButton.vue";
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import {computed, ref} from "vue";

const props = defineProps<{
  imageNameList: string[]
}>();

const searchTerm = ref("");

const pageNumber = ref(0);

const itemsPerPage = 10;


const disablePrevious = computed(() => pageNumber.value === 0);
const disableNext = computed(() => pageNumber.value === pageCount.value);

const filteredList = computed(() => {
  if(!searchTerm.value) {
    return props.imageNameList;
  }

  return props.imageNameList.filter((imageName) => imageName.includes(searchTerm.value));
})

const pageCount = computed(() => Math.ceil(filteredList.value.length/itemsPerPage) - 1)

const paginatedList = computed(() => {
  const start = pageNumber.value * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredList.value.slice(start, end);
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