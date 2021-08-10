<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ body }}</p>
    <p>{{ creationDate }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ITask } from '@/interfaces/ITask'
import { GET_TASK } from '@/store/actionTypes'
// import TaskList from '@/classes/TaskList'

export default Vue.extend({
  data() {
    return {
      task: {} as ITask
    }
  },
  created() {
    this.getTask()
  },
  computed: {
    title(): string {
      return this.task.title
    },
    body(): string | undefined {
      return this.task.body
    },
    creationDate(): string {
      if (this.task.creationDate) {
        return this.convertDate(this.task.creationDate)
      } else {
        return ''
      }
    },
    dueDate(): string {
      if (this.task.dueDate) {
        return this.convertDate(this.task.dueDate)
      } else {
        return ''
      }
    },
    tags(): Array<string> | undefined {
      return this.task.tags
    },
    status(): string | undefined {
      return this.task.status
    }
  },
  methods: {
    getTask() {
      const id = this.$route.params.id
      this.task = this.$store.getters[GET_TASK](id)
    },
    convertDate(date: Date): string {
      return date.toString().split(' ').slice(1, 4).join()
    }
  }
})
</script>

<style scoped></style>
