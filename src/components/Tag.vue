<template>
  <span class="tag micro">{{ text }}</span>
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
  padding: 0.25rem 0.5rem;
}
.tag:not(:first-child) {
  margin-left: 0.5rem;
}
</style>
