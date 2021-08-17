<template>
  <div class="wrapper">
    <div class="column-container">
      <div v-for="status in statusList" :key="`${status}-column`" class="column">
        <h2 class="capitalize light column-header sticky">{{ status }}</h2>
        <TaskItem v-for="task in getTasks(status)" :key="task.id" :task="task" :showStatus="false" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Task from '@/classes/Task'
import TaskItem from '@/components/TaskItem.vue'
import { ITask } from '@/interfaces/ITask'

export default Vue.extend({
  components: {
    TaskItem
  },
  computed: {
    statusList(): Array<string> {
      return Task.statusOptions()
    },
    tasks(): Array<ITask> {
      return this.$store.getters.GET_TASKS
    }
  },
  methods: {
    getTasks(status: string): Array<ITask> {
      return this.tasks.filter((task) => {
        return task.status && task.status.toLowerCase() === status.toLowerCase()
      })
    }
  }
})
</script>

<style scoped>
.wrapper {
  position: relative;
  margin-bottom: 0;
  height: calc(100vh - 4rem - 4rem - 1.5rem);
}
.column-container {
  display: grid;
  grid-auto-columns: 17rem;
  grid-auto-flow: column;
  grid-gap: 1rem;
  height: 100%;
  overflow: scroll;
  margin: 0 -1.5rem;
  padding: 0 1.5rem;
}
.column {
  border-radius: 1rem;
  padding: 0 1rem 1rem;
  background-color: var(--blue-900);
  max-height: 100%;
  overflow-y: scroll;
}
.column-header {
  padding: 1rem 0;
  background-color: var(--blue-900);
}
</style>
