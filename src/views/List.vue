<template>
  <div>
    <h1>List View</h1>
    <button @click="seedTask">Seed Task</button>
    <button @click="updateTask">Update Task</button>
    <button @click="getSortedTasks">Fetch Tasks</button>
  </div>
</template>

<script lang="ts">
import { Task } from '@/classes/Task'
import { ITask } from '@/interfaces/ITask'
import { ADD_TASK, UPDATE_TASK } from '@/store/actionTypes'
import Vue from 'vue'

export default Vue.extend({
  name: 'TaskList',
  props: {},
  data() {
    return {
      sortedTasks: []
    }
  },
  computed: {
    taskList(): Array<ITask> {
      return this.$store.state.tasks
    }
  },
  methods: {
    seedTask() {
      let sample: ITask = {
        id: '123',
        title: 'Seed',
        body: 'Seed'
      }
      this.$store.dispatch(ADD_TASK, new Task(sample))
    },
    updateTask() {
      let taskID = this.$store.state.tasks[0].id
      let sample: ITask = {
        id: taskID,
        title: 'Update',
        body: 'Update'
      }
      this.$store.dispatch(UPDATE_TASK, sample)
    },
    async getSortedTasks() {
      try {
        this.sortedTasks = await this.$store.getters.GET_BY_CREATED_DESC
      } catch (e) {
        console.log(e.message)
      }
    }
  }
})
</script>

<style scoped></style>
