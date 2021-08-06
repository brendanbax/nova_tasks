<template>
  <div>
    <h1>List View</h1>
    <button @click="seedTask">Seed Task</button>
    <button @click="updateTask">Update Task</button>
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
    return {}
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
    }
  }
})
</script>

<style scoped></style>
