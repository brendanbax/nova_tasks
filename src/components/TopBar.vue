<template>
  <div class="title-row">
    <span>
      <button v-if="showLeft" @click="handleLeft" class="micro">
        <slot name="left-action"></slot>
      </button>
    </span>
    <h1 class="subtitle center">{{ title }}</h1>
    <span class="right">
      <button v-if="showRight" @click="handleRight" class="micro">
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
  align-content: center;
  background-color: var(--blue-700);
  color: var(--gray-100);
  display: grid;
  grid-template-columns: 6rem 1fr 6rem;
  height: 4rem;
  margin: -1.5rem -1.5rem 0;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
}
button {
  background: none;
  border: none;
  color: var(--gray-100);
}
</style>
