<template>
  <v-app>
    <v-card class="pb-2">
      <v-app-bar color="primary" dark>
        <v-app-bar-title>inky UI</v-app-bar-title>
        <template #extension>
          <v-tabs align-with-title v-model="tab">
            <v-tab key="select">select</v-tab>
            <v-tab key="upload">upload</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-tabs-items v-model="tab">
        <v-tab-item key="select">
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
                    <v-text-field
                      v-model="search"
                      label="Search"
                      class="mx-4"
                    />
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
                    :loading="setting"
                    :disabled="!selectedImage"
                    @click="setSelectedImage"
                    >Set</v-btn
                  >
                </div>
                <div class="pa-2">
                  <v-btn :loading="loading" @click="getAdjustedImages"
                    >reload images</v-btn
                  >
                </div>
              </div>
            </div>
            <div v-else>
              <span>Die aktuellen Bilder werden geladen</span>
              <v-skeleton-loader type="list-item" />
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item key="upload">
          <v-card class="mx-2 px-2">
            <div style="display: flex">
              <div style="width: 50%" class="pa-4">
                <v-file-input
                  v-model="sourceFile"
                  show-size
                  accept="image/*"
                  :rules="[notEmpty, alreadyExists]"
                />
              </div>
              <div
                style="display: flex; flex-direction: column; justify-content: center"
                class="pa-4"
              >
                <v-btn
                  class="primary"
                  :loading="uploading || cropping"
                  :disabled="!sourceFile || alreadyExists(sourceFile)"
                  @click="uploadAndCrop"
                  >upload and crop</v-btn
                >
              </div>
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { API } from "@/services/backend-service";
import _ from "lodash";

export default Vue.extend({
  name: "App",

  components: {},

  data() {
    return {
      tab: null,
      loading: false,
      setting: false,
      uploading: false,
      cropping: false,
      adjustedImages: [] as string[],
      originalImages: [] as string[],
      selectedImage: "",
      sourceFile: undefined as File | undefined,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name"
        }
      ],
      search: ""
    };
  },
  async created() {
    await this.getAdjustedImages();
    await this.getOriginalImages();
  },
  computed: {
    availableImages(): { id: string; name: string }[] {
      return this.adjustedImages.map(img => {
        return {
          id: img,
          name: _.upperFirst(_.lowerCase(img.split(".")[0]))
        };
      });
    }
  },
  methods: {
    async getAdjustedImages(): Promise<void> {
      this.loading = true;
      const response = (await API.getImagesImagesAdjustedGet()) as {
        data: string[];
      };
      this.adjustedImages = response.data;
      this.loading = false;
    },

    async getOriginalImages(): Promise<void> {
      this.loading = true;
      const response = (await API.getImagesImagesOriginalGet()) as {
        data: string[];
      };
      this.originalImages = response.data;
      this.loading = false;
    },

    async setSelectedImage(): Promise<void> {
      this.setting = true;
      await API.setImageImagesSetImageNamePut(this.selectedImage);
      this.setting = false;
    },

    async uploadAndCrop(): Promise<void> {
      if (this.sourceFile) {
        try {
          this.uploading = true;
          await API.uploadFileUploadfilePost(this.sourceFile);
          this.uploading = false;
          this.cropping = true;
          await API.cropImageForInkyImagesCropImageNamePut(
            this.sourceFile.name
          );
          this.cropping = false;
        } catch (exception) {
          throw new Error(exception);
        } finally {
          this.uploading = false;
          this.cropping = false;
        }
      }
      await this.getOriginalImages();
    },

    clickRow(item: { id: string; name: string }) {
      this.selectedImage = item.id;
    },

    itemClass(item: { id: string; name: string }): Record<string, boolean> {
      return {
        "list-selected": item.id === this.selectedImage
      };
    },

    alreadyExists(sourceFile: File): boolean | string {
      if (this.originalImages.includes(sourceFile.name)) {
        return "Image with this name already exists";
      }
      return true;
    },

    notEmpty(sourceFile: File): boolean | string {
      if (!sourceFile) {
        return "You cannot upload an empty file";
      }
      return true;
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
