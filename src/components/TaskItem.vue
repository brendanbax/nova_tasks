<template>
  <div class="tile task" @click="handleClick">
    <h2 class="subtitle" :class="taskClass">{{ taskTitle }}</h2>
    <div class="flex-row">
      <p class="micro mt-2" :class="taskClass" v-if="taskDue">Due: {{ taskDue }}</p>
      <Tag class="flex-end" :text="taskStatus" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Tag from '@/components/Tag.vue'
import Dates from '@/classes/Dates'

export default Vue.extend({
  name: 'TaskItem',
  components: {
    Tag
  },
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
    taskStatus(): string {
      return this.task.status || 'unclassified'
    },
    taskDue(): string {
      return this.task.dueDate ? Dates.dateToPretty(this.task.dueDate) : 'No due date'
    },
    taskClass(): string {
      if (this.task.status.toLowerCase() === 'done' || this.task.status.toLowerCase() === 'archive') {
        return 'complete'
      } else {
        return ''
      }
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
.complete {
  text-decoration: line-through;
}
.flex-end {
  margin-left: auto;
  transform: translateY(0.5rem);
}
</style>
