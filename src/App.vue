<template>
  <v-app>
    <main-view />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import MainView from "@/components/MainView.vue";

export default Vue.extend({
  components: { MainView }
});
</script>
