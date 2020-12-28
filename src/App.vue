<template>
  <v-app>
    <v-card class="pb-2">
      <v-app-bar color="primary" dark>
        <v-app-bar-title>inky UI</v-app-bar-title>
        <template #extension>
          <v-tabs align-with-title v-model="tab">
            <v-tab key="current">current</v-tab>
            <v-tab key="upload">upload</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-tabs-items v-model="tab">
        <v-tab-item key="current">
          <v-card class="px-2 mx-2">
            <div v-if="!loading">
              <v-select
                v-model="selectedImage"
                :items="adjustedImages"
                label="Adjusted Images"
              />
              <div>
                <div>
                  <span>Image to set</span>
                  <span>{{ selectedImage }}</span>
                </div>
                <div>
                  <v-btn
                    class="primary"
                    :loading="setting"
                    @click="setSelectedImage"
                    >Set</v-btn
                  >
                </div>
                <div>
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
            <div>
              <v-file-input v-model="sourceFile" show-size accept="image/*" />
            </div>
            <div>
              <v-btn
                class="primary"
                :loading="uploading || cropping"
                @click="uploadAndCrop"
                >upload and crop</v-btn
              >
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-btn fab class="bottom-right primary" disabled>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { API } from "@/services/backend-service";

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
      selectedImage: "",
      sourceFile: undefined as File | undefined
    };
  },
  async created() {
    await this.getAdjustedImages();
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

    async setSelectedImage(): Promise<void> {
      this.setting = true;
      await API.setImageImagesSetImageNamePut(this.selectedImage);
      this.setting = false;
    },

    async uploadAndCrop(): void {
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
    }
  }
});
</script>

<style scoped>
.bottom-right {
  position: absolute;
  bottom: 1em;
  right: 1em;
}
</style>
