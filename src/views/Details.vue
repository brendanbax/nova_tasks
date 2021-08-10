<template>
  <div class="view-container">
    <div>
      <button @click="handleBack">Back</button>
    </div>
    <h2>{{ title }}</h2>
    <p>{{ body }}</p>
    <p>{{ creationDate }}</p>
    <div>
      <span v-for="(tag, index) in tags" :key="`${id}-${index}`" class="tag micro">{{ tag }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ITask } from '@/interfaces/ITask'
import { GET_TASK } from '@/store/actionTypes'

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
    id(): string | undefined {
      return this.task.id
    },
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
    },
    handleBack(): void {
      this.$router.go(-1)
    }
  }
})
</script>

<style scoped>
.tag {
  background-color: var(--green-500);
  border-radius: 1rem;
  color: var(--blue-900);
  padding: 0.25rem 0.5rem;
}
.tag:not(:first-child) {
  margin-left: 0.5rem;
}
</style>
