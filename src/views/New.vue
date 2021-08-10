<template>
  <div class="view-container">
    <TaskForm @cancel="handleCancel" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TaskForm from '@/components/TaskForm.vue'

export default Vue.extend({
  name: 'NewTask',
  components: {
    TaskForm
  },
  methods: {
    handleCancel() {
      this.$router.go(-1)
    }
  }
})
</script>
