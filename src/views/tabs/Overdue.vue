<template>
  <div>
    <TaskItem v-for="task in overdueTasks" :key="task.index" :task="task" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TaskItem from '@/components/TaskItem.vue'

export default Vue.extend({
  components: {
    TaskItem
  },
  computed: {
    overdueTasks() {
      return this.$store.getters.GET_BY_OVERDUE
    }
  }
})
</script>

<style scoped></style>
