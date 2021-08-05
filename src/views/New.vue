<template>
  <div>
    <button @click="makeTask">Make A Task</button>
  </div>
</template>

<script lang="ts">
import { ADD_TASK } from '@/store/type'
import { Component, Vue } from 'vue-property-decorator'
import Task from '@/classes/Task'
import ITask from '@/interfaces/Task'

@Component
export default class extends Vue {
  makeTask(): ITask {
    let taskDetails = {
      title: 'Task Title'
    }
    let newTask = new Task(taskDetails)
    this.$store.commit(ADD_TASK, newTask)
    return newTask
  }
}
</script>
