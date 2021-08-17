<template>
  <span class="tag micro capitalize">{{ text }}</span>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.tag {
  background-color: var(--green-500);
  border-radius: 1rem;
  color: var(--blue-900);
  font-weight: bold;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
}
.tag:not(:last-child) {
  margin-right: 0.5rem;
}
</style>
