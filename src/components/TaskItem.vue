<template>
  <div class="container" @click="handleClick">
    <h2 class="subtitle">{{ taskTitle }}</h2>
    <p class="micro" v-if="taskDue">{{ taskDue }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  computed: {
    taskId(): string {
      return this.task.id
    },
    taskTitle(): string {
      return this.task.title || ''
    },
    taskDue(): Date | null {
      return this.task.dueDate || null
    }
  },
  methods: {
    handleClick(): void {
      this.$router.push(`/tasks/${this.taskId}`)
    }
  }
})
</script>

<style scoped>
.container {
  background-image: linear-gradient(var(--trans-500), var(--trans-300));
  border-radius: 1rem;
  box-shadow: 0 0.675rem 0.75rem -0.25rem rgba(0, 0, 0, 0.25);
  padding: 1rem;
}
.container:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
