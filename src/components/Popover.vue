<template>
  <div class="relative">
    <button @click="toggleMenu">
      <slot></slot>
    </button>
    <div v-if="showMenu" class="tile container w-100">
      <div
        v-for="(option, index) in options"
        :key="`option-${index}`"
        @click="handleSelect(option)"
        @keyup.enter="handleSelect(option)"
        class="light pointer capitalize option"
        tabindex="0"
      >
        {{ option }}
      </div>
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

<style scoped>
.container {
  position: absolute;
  top: 1.5rem;
  left: 0;
  z-index: 999;
  background-color: var(--blue-900);
}
.option {
  padding: 1rem 0.5rem;
  border-bottom: 0.125rem solid var(--trans-700);
}
.option:last-child {
  margin-bottom: 0;
  border-bottom: none;
}
</style>
