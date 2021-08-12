<template>
  <div class="view-container">
    <TopBar title="New Task" @left="handleCancel" @right="handleSave">
      <template v-slot:left-action>Cancel</template>
      <template v-slot:right-action>Save</template>
    </TopBar>
    <TaskForm @update="handleUpdate" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Task from '@/classes/Task'
import { ITask } from '@/interfaces/ITask'
import { ADD_TASK } from '@/store/actionTypes'
import TopBar from '@/components/TopBar.vue'
import TaskForm from '@/components/TaskForm.vue'

export default Vue.extend({
  name: 'NewTask',
  components: {
    TopBar,
    TaskForm
  },
  data() {
    return {
      task: {} as ITask
    }
  },
  computed: {
    allowSave(): boolean {
      return this.task.title ? true : false
    }
  },
  methods: {
    handleUpdate(task: ITask): void {
      this.task = task
    },
    handleCancel(): void {
      this.$router.go(-1)
    },
    handleSave(): void {
      if (this.allowSave) {
        const newTask: ITask = new Task(this.task)
        this.$store.dispatch(ADD_TASK, newTask)
        this.$router.go(-1)
      } else {
        return
      }
    }
  }
})
</script>
