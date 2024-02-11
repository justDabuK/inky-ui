<template>
  <div class="image-list-container">
    <h2>List of images</h2>
    <div class="search-container">
      <input v-model="searchTerm" placeholder="enter a search term" />
    </div>
    <div class="pagination-container">
      <div>
        <BaseButton :disabled="disablePrevious" @click="previousPage">
          <ChevronLeft />
        </BaseButton>
        <BaseButton :disabled="disableNext" @click="nextPage">
          <ChevronRight />
        </BaseButton>
      </div>
      <span>{{ `${pageNumber}/${pageCount}` }}</span>
    </div>
    <Galery :image-list="paginatedList" :width="width" :height="height" />
  </div>
</template>

<script setup lang="ts">
import Galery from './Galery.vue';
import BaseButton from './base/BaseButton.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
  imageNameList: string[];
  width: number;
  height: number;
}>();

const searchTerm = ref('');

const pageNumber = ref(0);

const itemsPerPage = 10;

const disablePrevious = computed(() => pageNumber.value === 0);
const disableNext = computed(() => pageNumber.value === pageCount.value);

const filteredList = computed(() => {
  if (!searchTerm.value) {
    return props.imageNameList;
  }

  return props.imageNameList.filter((imageName) =>
    imageName.includes(searchTerm.value)
  );
});

const pageCount = computed(
  () => Math.ceil(filteredList.value.length / itemsPerPage) - 1
);

const paginatedList = computed(() => {
  const start = pageNumber.value * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredList.value.slice(start, end);
});

function nextPage() {
  pageNumber.value++;
}

function previousPage() {
  pageNumber.value--;
}
</script>

<style scoped>
.image-list-container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  h2 {
    text-align: center;
  }

  .search-container {
    display: flex;
    justify-content: center;

    input {
      background-color: #1a1a1a;
      border-radius: 0.25rem;
      padding: 0.5rem;
      font: inherit;
      border: 0;

      &:focus {
        outline: solid rgb(13 148 136);
      }
    }
  }

  .pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
