<template>
  <div>
    <h1>List View</h1>
    <button @click="seedTask">Seed Task</button>
    <button @click="handleLocalStorage">Store In Local</button>
    <button @click="handleGetLocal">Get From Local</button>
  </div>
</template>

<script lang="ts">
import { Task } from '@/classes/Task'
import { ITask } from '@/interfaces/ITask'
import { ADD_TASK, SET_LOCAL_STATE, GET_LOCAL_STATE } from '@/store/actionTypes'
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
    async handleLocalStorage() {
      this.$store.dispatch(SET_LOCAL_STATE).then((res) => console.log(res))
    },
    async handleGetLocal() {
      this.$store.dispatch(GET_LOCAL_STATE).then((res) => console.log(res))
    }
  }
})
</script>

<style scoped></style>
