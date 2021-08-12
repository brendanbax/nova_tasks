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
      <label for="status" class="block label ml-2">Status</label>
      <select v-model="status" id="status">
        <option v-for="(option, index) in statusOptions" :key="`option-${index}`">{{ option }}</option>
      </select>
    </div>
    <div class="form-row">
      <div class="flex-row">
        <label for="due" class="label ml-2">Due Date</label>
        <button @click.prevent="removeDate" class="mb-2">Remove</button>
      </div>
      <input id="tags" type="date" v-model="dueDate" />
    </div>
    <div class="form-row">
      <label for="tags" class="block label ml-2">Tags</label>
      <input id="tags" type="text" v-model="tags" />
      <p class="micro helptext ml-2">Separate tags with commas</p>
    </div>
    <button @click.prevent="handleUpdate" class="mt-5 button button-primary">Save</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Task from '@/classes/Task'
import Dates from '@/classes/Dates'
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
      dueDate: '',
      tags: '',
      status: ''
    }
  },
  mounted() {
    if (this.taskObj) {
      const computedDate: string = this.taskObj.dueDate ? Dates.objectToString(this.taskObj.dueDate) : ''

      this.id = this.taskObj.id
      this.title = this.taskObj.title
      this.body = this.taskObj.body
      this.dueDate = computedDate
      this.tags = this.taskObj.tags.join(', ')
      this.status = this.taskObj.status
    }
  },
  computed: {
    taskObject(): ITask {
      const tagList: Array<string> = Task.expandTags(this.tags)

      return {
        id: this.id,
        title: this.title,
        body: this.body,
        dueDate: this.dueDate ? Dates.stringToObject(this.dueDate) : null,
        tags: tagList,
        status: this.status.toLowerCase() === 'none' ? '' : this.status
      }
    },
    statusOptions() {
      return Task.statusOptions()
    }
  },
  methods: {
    handleUpdate(): void {
      if (this.taskObj) {
        this.updateTask()
      } else {
        this.addTask()
      }
      this.$emit('cancel')
    },
    clearUpdate(): void {
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
    },
    removeDate(): void {
      this.dueDate = ''
    }
  }
})
</script>

<style scoped>
.form-body {
  color: var(--gray-100);
  width: 100%;
}
.helptext {
  margin-top: 0.5rem;
}
</style>
