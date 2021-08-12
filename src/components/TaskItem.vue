<template>
  <div class="tile task" @click="handleClick">
    <h2 class="subtitle">{{ taskTitle }}</h2>
    <p class="micro mt-2" v-if="taskDue">Due: {{ taskDue }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Dates from '@/classes/Dates'

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
    taskDue(): string {
      return this.task.dueDate ? Dates.dateToPretty(this.task.dueDate) : ''
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
.task {
  color: var(--gray-100);
}
.task:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
