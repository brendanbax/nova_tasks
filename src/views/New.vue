<template>
  <TaskForm />
</template>

<script lang="ts">
import Vue from 'vue'
import TaskForm from '@/components/TaskForm.vue'

export default Vue.extend({
  name: 'NewTask',
  components: {
    TaskForm
  }
})
</script>
