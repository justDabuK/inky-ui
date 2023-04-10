<template>
  <button class="active:animate-ping" :class="primary ? 'bg-teal-600 hover:bg-teal-700 disabled:bg-teal-900' : 'disabled:opacity-50'" :disabled="disabled">
    <div :class="disabled && 'opacity-50'">
      <div v-if="loading" class="animate-spin">
        <Loading />
      </div>
      <slot v-else />
    </div>
  </button>
</template>

<script setup lang="ts">
import Loading from 'vue-material-design-icons/Loading.vue'

defineProps<{
  disabled?: boolean
  primary?: boolean
  loading?: boolean
}>()
</script>