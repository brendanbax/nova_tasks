<template>
  <div>
    <button @click="toggleMenu">
      <slot></slot>
    </button>
    <div v-if="showMenu">
      <div v-for="(option, index) in options" :key="`option-${index}`" @click="handleSelect(option)">{{ option }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    position: {
      type: String,
      default: 'right'
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleMenu(): void {
      this.showMenu = !this.showMenu
    },
    handleSelect(option: string): void {
      this.$emit('select', option)
      this.showMenu = false
    }
  }
})
</script>

<style scoped></style>
