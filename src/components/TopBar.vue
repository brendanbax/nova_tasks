<template>
  <div class="title-row">
    <span>
      <button v-if="showLeft" @click="handleLeft">
        <slot name="left-action"></slot>
      </button>
    </span>
    <h1 class="subtitle center">{{ title }}</h1>
    <span>
      <button v-if="showRight" @click="handleRight">
        <slot name="right-action"></slot>
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String
    },
    showLeft: {
      type: Boolean,
      default: true
    },
    showRight: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleLeft() {
      this.$emit('left')
    },
    handleRight() {
      this.$emit('right')
    }
  }
})
</script>

<style scoped>
.title-row {
  color: var(--gray-100);
  display: grid;
  grid-template-columns: 4rem 1fr 4rem;
  height: 2rem;
  align-content: center;
}
button {
  background: none;
  border: none;
  color: var(--gray-100);
}
</style>
