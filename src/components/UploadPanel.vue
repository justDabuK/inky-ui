<template>
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
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    uploading: {
      type: Boolean
    },
    cropping: {
      type: Boolean
    },
    originalImages: {
      type: Array as PropType<Array<string>>,
      required: true
    }
  },
  data() {
    return {
      sourceFile: undefined as File | undefined
    };
  },
  methods: {
    uploadAndCrop() {
      this.$emit("upload-and-crop", this.sourceFile);
    },

    nameNotGiven(sourceFile: File | undefined): boolean | string {
      if (sourceFile) {
        if (this.originalImages.includes(sourceFile.name)) {
          return "Image with this name already exists";
        }
      }
      return true;
    },

    notEmpty(sourceFile: File | undefined): boolean | string {
      if (!sourceFile) {
        return "You cannot upload an empty file";
      }
      return true;
    }
  }
});
</script>
