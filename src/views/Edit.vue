<template>
  <div class="view-container">
    <TopBar title="Edit Task" @left="handleCancel" @right="displayAlert">
      <template v-slot:left-action>Cancel</template>
      <template v-slot:right-action>Delete</template>
    </TopBar>
    <TaskForm @cancel="handleCancel" :taskObj="routeTask" />
    <div v-if="showAlert" class="scrim">
      <div class="tile dialog">
        <h2 class="subtitle">Are you sure you want to delete this task?</h2>
        <div class="action-row mt-4">
          <button @click="dismissAlert" class="button button-primary">Cancel</button>
          <button @click="handleDelete" class="button button-secondary">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GET_TASK, DELETE_TASK } from '@/store/actionTypes'
import TopBar from '@/components/TopBar.vue'
import TaskForm from '@/components/TaskForm.vue'

export default Vue.extend({
  components: {
    TopBar,
    TaskForm
  },
  data() {
    return {
      showAlert: false
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
    handleCancel(): void {
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

<style scoped>
.scrim {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: var(--blue-900);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dialog {
  margin: 0 2rem;
  color: var(--gray-100);
}
.action-row {
  display: flex;
  justify-content: space-between;
}
.action-row > button {
  width: 50%;
}
.action-row > button:last-child {
  margin-left: 1rem;
}
</style>
