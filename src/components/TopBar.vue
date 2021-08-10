<template>
  <TaskForm v-if="showNewTask" @cancel="toggleNewTask" />
  <div v-else class="container">
    <button @click="toggleNewTask">Add Task</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TaskForm from '@/components/TaskForm.vue'

export default Vue.extend({
  components: {
    TaskForm
  },
  data() {
    return {
      showNewTask: false
    }
  },
  methods: {
    toggleNewTask(): void {
      this.showNewTask = !this.showNewTask
    }
  }
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: flex-end;
  margin: 1.5rem 1.5rem 0;
}
</style>
