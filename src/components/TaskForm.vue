<template>
  <form class="flex-col form-body">
    <div class="form-row">
      <label for="title" class="block label ml-2">Title<span class="danger">*</span></label>
      <input id="title" type="text" required ref="title" v-model="title" @change="handleUpdate" />
    </div>
    <div class="form-row">
      <label for="body" class="block label ml-2">Body</label>
      <textarea id="body" type="text" rows="7" v-model="body" @change="handleUpdate" />
    </div>
    <div class="form-row">
      <label for="status" class="block label ml-2">Status</label>
      <select v-model="status" @change="handleUpdate" id="status">
        <option v-for="(option, index) in statusOptions" :key="`option-${index}`">{{ option }}</option>
      </select>
    </div>
    <div class="form-row">
      <div class="flex-row">
        <label for="due" class="label ml-2">Due Date</label>
        <button @click.prevent="removeDate" class="mb-2">Remove</button>
      </div>
      <input id="tags" type="date" v-model="dueDate" @change="handleUpdate" />
    </div>
    <div class="form-row">
      <label for="tags" class="block label ml-2">Tags</label>
      <input id="tags" type="text" v-model="tags" @change="handleUpdate" />
      <p class="micro helptext ml-2">Separate tags with commas</p>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Task from '@/classes/Task'
import Dates from '@/classes/Dates'
import { ITask } from '@/interfaces/ITask'

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
    this.handleUpdate()
    this.handleFocus()
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
      return ['none', ...Task.statusOptions()]
    }
  },
  methods: {
    handleUpdate(): void {
      this.$emit('update', this.taskObject)
    },
    removeDate(): void {
      this.dueDate = ''
    },
    handleFocus(): void {
      if (!this.taskObj) {
        const el = this.$refs.title as HTMLElement
        if (el) {
          el.focus()
        }
      }
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
