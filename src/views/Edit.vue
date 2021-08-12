<template>
  <div class="view-container">
    <TopBar title="Edit Task" @left="handleCancel" @right="handleSave">
      <template v-slot:left-action>Cancel</template>
      <template v-slot:right-action>Save</template>
    </TopBar>
    <TaskForm :taskObj="routeTask" @update="handleUpdate" />
    <button @click.prevent="displayAlert" class="mt-5 w-100 button button-danger">Delete</button>
    <Dialog
      v-if="showAlert"
      message="Are you sure you want to delete this task?"
      action="Delete"
      dismiss="Cancel"
      @action="handleDelete"
      @dismiss="dismissAlert"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ITask } from '@/interfaces/ITask'
import { GET_TASK, DELETE_TASK, UPDATE_TASK } from '@/store/actionTypes'
import TopBar from '@/components/TopBar.vue'
import TaskForm from '@/components/TaskForm.vue'
import Dialog from '@/components/Dialog.vue'

export default Vue.extend({
  components: {
    TopBar,
    TaskForm,
    Dialog
  },
  data() {
    return {
      showAlert: false,
      task: {} as ITask
    }
  },
  computed: {
    taskId(): string {
      return this.$route.params.id
    },
    routeTask() {
      const id = this.$route.params.id
      return this.$store.getters[GET_TASK](id)
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
      this.$store.dispatch(UPDATE_TASK, this.task)
      this.$router.go(-1)
    },
    displayAlert(): void {
      this.showAlert = true
    },
    dismissAlert(): void {
      this.showAlert = false
    },
    async handleDelete() {
      const status = await this.$store.dispatch(DELETE_TASK, this.taskId)
      if (status.message === 'success') {
        this.dismissAlert()
        this.$router.go(-2)
      }
    }
  }
})
</script>

<style scoped></style>
