<template>
  <form class="flex-col form-body">
    <div class="form-row">
      <label for="title" class="block label ml-2">Title</label>
      <input id="title" type="text" v-model="title" />
    </div>
    <div class="form-row">
      <label for="body" class="block label ml-2">Body</label>
      <textarea id="body" type="text" rows="7" v-model="body" />
    </div>
    <div class="form-row">
      <label for="tags" class="block label ml-2">Tags</label>
      <input id="tags" type="text" v-model="tags" />
      <p class="micro helptext ml-2">Separate tags with commas</p>
    </div>
    <div class="form-row">
      <label for="status" class="block label ml-2">Status</label>
      <input id="status" type="text" v-model="status" />
    </div>
    <button @click.prevent="handleUpdate" class="mt-5 button button-primary">Save</button>
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
      const tagList = this.tags === '' ? [] : this.tags.split(',').map((el: string) => el.trim())
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
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-body {
  color: var(--gray-100);
  width: 100%;
}
.helptext {
  margin-top: 0.5rem;
}
</style>
