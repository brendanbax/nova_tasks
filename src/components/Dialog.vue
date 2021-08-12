<template>
  <div class="scrim">
    <div class="tile dialog">
      <h2 class="subtitle">{{ message }}</h2>
      <div class="action-row mt-4">
        <button @click="emitDismiss" class="button button-primary">{{ dismiss }}</button>
        <button @click="emitAction" class="button button-secondary">{{ action }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    message: {
      type: String,
      default: 'Are you sure you want to perform this action?'
    },
    action: {
      type: String,
      default: 'Perform Action'
    },
    dismiss: {
      type: String,
      default: 'Cancel'
    }
  },
  methods: {
    emitAction(): void {
      this.$emit('action')
    },
    emitDismiss(): void {
      this.$emit('dismiss')
    }
  }
})
</script>

<style scoped>
.scrim {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: var(--blue-900);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dialog {
  margin: 0 2rem;
  color: var(--gray-100);
}
.action-row {
  display: flex;
  justify-content: space-between;
}
.action-row > button {
  width: 50%;
}
.action-row > button:last-child {
  margin-left: 1rem;
}
</style>
