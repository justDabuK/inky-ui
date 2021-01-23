<template>
  <v-card class="px-2 mx-2">
    <div v-if="!loading">
      <div class="list-container">
        <v-data-table
          :items="availableImages"
          :headers="headers"
          :search="search"
          :item-class="itemClass"
          @click:row="clickRow"
        >
          <template #top>
            <v-text-field v-model="search" label="Search" class="mx-4" />
          </template>
        </v-data-table>
      </div>
      <div class="pa-2" style="display: flex">
        <span>Image to set</span>
        <span class="px-2">{{ selectedImage }}</span>
      </div>
      <div style="display: flex">
        <div class="pa-2">
          <v-btn
            class="primary"
            :loading="setting || false"
            :disabled="!selectedImage"
            @click="setSelectedImage"
            >Set</v-btn
          >
        </div>
        <div class="pa-2">
          <v-btn :loading="loading" @click="updateImages">
            reload images
          </v-btn>
        </div>
      </div>
      <div class="d-flex justify-center">
        <v-card>
          <div class="pa-2" style="transform: rotate(-90deg); margin-top: 5em">
            <v-img
              v-if="selectedImage"
              :src="getAdjustedDownloadPath(selectedImage)"
            />
          </div>
        </v-card>
      </div>
    </div>
    <div v-else>
      <span>Die aktuellen Bilder werden geladen</span>
      <v-skeleton-loader type="list-item" />
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { getAdjustedDownloadPath } from "@/services/backend-service";

export default Vue.extend({
  props: {
    availableImages: {
      type: Array as PropType<Array<string>>,
      required: true
    },
    headers: {
      type: Array as PropType<
        Array<{ text: string; align: string; sortable: boolean; value: string }>
      >,
      required: true
    },
    setting: {
      type: Boolean
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      search: "",
      selectedImage: ""
    };
  },
  methods: {
    getAdjustedDownloadPath,

    clickRow(item: { id: string; name: string }) {
      this.selectedImage = item.id;
    },

    itemClass(item: { id: string; name: string }): Record<string, boolean> {
      return {
        "list-selected": item.id === this.selectedImage
      };
    },

    setSelectedImage() {
      this.$emit("set-selected-image", this.selectedImage);
    },

    updateImages() {
      this.$emit("update-images");
    }
  }
});
</script>

<style scoped>
.list-container >>> tbody > tr:hover:not(.list-selected) {
  background-color: var(--v-primary-lighten3) !important;
}
.list-container >>> .list-selected {
  background-color: var(--v-primary-lighten1) !important;
  color: white !important;
}
</style>
