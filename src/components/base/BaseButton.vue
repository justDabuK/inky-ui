<template>
  <button :class="primary ? 'primary' : 'secondary'" :disabled="disabled">
    <div class="content-container">
      <div v-if="loading" class="loading-spinner">
        <Loading />
      </div>
      <slot v-else />
    </div>
  </button>
</template>

<script setup lang="ts">
import Loading from 'vue-material-design-icons/Loading.vue';

defineProps<{
  disabled?: boolean;
  primary?: boolean;
  loading?: boolean;
}>();
</script>

<style scoped>
button {
  border-radius: 0.25rem;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
}

.primary {
  /* TODO: move colors to central place */
  background-color: rgb(13 148 136);

  &:hover {
    background-color: rgb(15 118 110);
  }

  &:disabled {
    background-color: rgb(19 78 74);
  }
}

.secondary {
  background-color: #1a1a1a;

  &:disabled {
    opacity: 0.5;
  }
}

.content-container {
  &:disabled {
    opacity: 0.5;
  }
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
