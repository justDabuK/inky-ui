<template>
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
        <upload-panel
          :original-images="originalImages"
          :uploading="uploading"
          :cropping="cropping"
          @upload-and-crop="uploadAndCrop"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import UploadPanel from "./UploadPanel.vue";
import SelectionPanel from "./SelectionPanel.vue";
import _ from "lodash";
import { API } from "../services/backend-service";

export default Vue.extend({
  components: { UploadPanel, SelectionPanel },

  data() {
    return {
      tab: null,
      loading: false,
      setting: false,
      uploading: false,
      cropping: false,
      adjustedImages: [] as string[],
      originalImages: [] as string[],
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
      const response = (await API.getAdjustedImagesImagesAdjustedGet()) as {
        data: string[];
      };
      this.adjustedImages = response.data;
      this.loading = false;
    },

    async getOriginalImages(): Promise<void> {
      this.loading = true;
      const response = (await API.getOriginalImagesImagesOriginalGet()) as {
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

    async uploadAndCrop(sourceFile: File | undefined): Promise<void> {
      if (sourceFile) {
        try {
          this.uploading = true;
          await API.uploadFileUploadfilePost(sourceFile);
          this.uploading = false;
          this.cropping = true;
          await API.cropImageForInkyImagesCropImageNamePut(sourceFile.name);
          this.cropping = false;
        } catch (exception) {
          throw new Error(exception);
        } finally {
          this.uploading = false;
          this.cropping = false;
        }
      }
      await this.updateImages();
    }
  }
});
</script>
