<template>
  <div class="tile center light pointer" @click="handleClick">
    <h2 class="subtitle">{{ count }}</h2>
    <p class="micro capitalize">{{ category }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    category: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleClick(): void {
      this.$emit('click')
    }
  }
})
</script>

<style scoped></style>
