<template>
  <div class="tile" @click="handleClick">
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
.container:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
