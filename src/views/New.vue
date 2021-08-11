<template>
  <div class="view-container">
    <TopBar title="New Task" :showRight="false" @left="handleCancel">
      <template v-slot:left-action>Cancel</template>
    </TopBar>
    <TaskForm @cancel="handleCancel" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TopBar from '@/components/TopBar.vue'
import TaskForm from '@/components/TaskForm.vue'

export default Vue.extend({
  name: 'NewTask',
  components: {
    TopBar,
    TaskForm
  },
  methods: {
    handleCancel() {
      this.$router.go(-1)
    }
  }
})
</script>
