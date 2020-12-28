<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>inky UI</v-app-bar-title>
      <template #extension>
        <v-tabs align-with-title v-model="tab">
          <v-tab key="current">current</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-btn fab class="bottom-right primary">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {},

  data() {
    return {
      tab: null
    };
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
