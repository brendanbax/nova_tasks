<template>
  <form>
    <div>
      <label for="title">Title</label>
      <input id="title" type="text" v-model="title" />
    </div>
    <div>
      <label for="body">Body</label>
      <input id="body" type="text" v-model="body" />
    </div>
    <div>
      <label for="tags">Tags</label>
      <input id="tags" type="text" v-model="tags" />
      <p>Separate tags with commas</p>
    </div>
    <div>
      <label for="status">Status</label>
      <input id="status" type="text" v-model="status" />
    </div>
    <button @click.prevent="handleUpdate">Save</button>
    <button @click.prevent="clearUpdate">Discard</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Task } from '@/classes/Task'
import { ITask } from '@/interfaces/ITask'
import { ADD_TASK, UPDATE_TASK } from '@/store/actionTypes'

export default Vue.extend({
  name: 'TaskForm',
  props: {
    taskObj: {
      type: Object
    }
  },
  data() {
    return {
      id: '',
      title: '',
      body: '',
      dueDate: null,
      tags: '',
      status: ''
    }
  },
  mounted() {
    if (this.taskObj) {
      this.id = this.taskObj.id
      this.title = this.taskObj.title
      this.body = this.taskObj.body
      this.dueDate = this.taskObj.dueDate
      this.tags = this.taskObj.tags.join(', ')
      this.status = this.taskObj.status
    }
  },
  computed: {
    taskObject(): ITask {
      const tagList = this.tags.split(',').map((el: string) => el.trim())
      return {
        id: this.id,
        title: this.title,
        body: this.body,
        dueDate: this.dueDate,
        tags: tagList,
        status: this.status
      }
    }
  },
  methods: {
    handleUpdate() {
      if (this.taskObj) {
        this.updateTask()
      } else {
        this.addTask()
      }
      this.$emit('cancel')
    },
    clearUpdate() {
      this.$emit('cancel')
    },
    addTask(): ITask {
      let newTask = new Task(this.taskObject)
      this.$store.dispatch(ADD_TASK, newTask)
      return newTask
    },
    updateTask(): void {
      this.$store.dispatch(UPDATE_TASK, this.taskObject)
      return
    }
  }
})
</script>

<style scoped>
form {
  color: white;
}
</style>
