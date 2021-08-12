<template>
  <div>
    <TaskItem v-for="task in taskList" :key="task.index" :task="task" />
  </div>
</template>

<script lang="ts">
import TaskItem from '@/components/TaskItem.vue'
import { ITask } from '@/interfaces/ITask'
import Vue from 'vue'

export default Vue.extend({
  name: 'TaskList',
  components: {
    TaskItem
  },
  data() {
    return {
      sortingOptions: ['Creation Date (desc)', 'Creation Date (asc)', 'Due Date (desc)', 'Due Date (asc)'],
      sortingSelection: 'Creation Date (desc)'
    }
  },
  computed: {
    taskList(): Array<ITask> {
      if (this.sortingSelection.includes('Creation') && this.sortingSelection.includes('desc')) {
        return this.$store.getters.GET_BY_CREATED_DESC
      } else if (this.sortingSelection.includes('Creation') && this.sortingSelection.includes('asc')) {
        return this.$store.getters.GET_BY_CREATED_ASC
      } else if (this.sortingSelection.includes('Due') && this.sortingSelection.includes('desc')) {
        return this.$store.getters.GET_BY_DUE_DESC
      } else if (this.sortingSelection.includes('Due') && this.sortingSelection.includes('asc')) {
        return this.$store.getters.GET_BY_DUE_ASC
      } else {
        return this.$store.getters.GET_TASKS
      }
    }
  },
  methods: {
    updateSorting(event: { target: HTMLInputElement }): void {
      const target = event.target.value
      console.log(target)
    }
  }
})
</script>

<style scoped></style>
