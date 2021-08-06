<template>
  <div>
    <input type="text" v-model="title" />
    <button @click="addTask">Add A Task</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TaskModel, Task } from '@/classes/Task'
import { ADD_TASK } from '@/store/actionTypes'

export default Vue.extend({
  name: 'NewTask',
  props: {},
  data() {
    return {
      title: '',
      body: '',
      dueDate: null,
      tags: [],
      status: ''
    }
  },
  computed: {
    taskObject(): TaskModel {
      return {
        title: this.title,
        body: this.body,
        dueDate: this.dueDate,
        tags: this.tags,
        status: this.status
      }
    }
  },
  methods: {
    addTask(): TaskModel {
      let newTask = new Task(this.taskObject)
      this.$store.dispatch(ADD_TASK, newTask)
      return newTask
    }
  }
})
</script>
