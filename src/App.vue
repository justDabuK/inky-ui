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
          <selection-panel
            :available-images="availableImages"
            :headers="headers"
            :setting="setting"
            :loading="loading"
            @set-selected-image="setSelectedImage"
            @update-images="updateImages"
          />
        </v-tab-item>
        <v-tab-item key="upload">
          <v-card class="mx-2 px-2">
            <div style="display: flex">
              <div style="width: 50%" class="pa-4">
                <v-file-input
                  v-model="sourceFile"
                  show-size
                  accept="image/*"
                  :rules="[notEmpty, nameNotGiven]"
                />
              </div>
              <div
                style="display: flex; flex-direction: column; justify-content: center"
                class="pa-4"
              >
                <v-btn
                  class="primary"
                  :loading="uploading || cropping"
                  :disabled="!sourceFile || !nameNotGiven(sourceFile)"
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
import SelectionPanel from "@/components/SelectionPanel.vue";

export default Vue.extend({
  name: "App",

  components: { SelectionPanel },

  data() {
    return {
      tab: null,
      loading: false,
      setting: false,
      uploading: false,
      cropping: false,
      adjustedImages: [] as string[],
      originalImages: [] as string[],
      sourceFile: undefined as File | undefined,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name"
        }
      ]
    };
  },
  async created() {
    await this.updateImages();
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

    async updateImages(): Promise<void> {
      await this.getAdjustedImages();
      await this.getOriginalImages();
    },

    async setSelectedImage(imageName: string): Promise<void> {
      this.setting = true;
      await API.setImageImagesSetImageNamePut(imageName);
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
      await this.updateImages();
    },

    nameNotGiven(sourceFile: File): boolean | string {
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
