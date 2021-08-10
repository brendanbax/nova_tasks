<template>
  <div class="view-main">
    <div class="container">
      <button @click="handleNew">Add Task</button>
    </div>
    <router-view />
    <NavBar />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavBar from '@/components/NavBar.vue'

export default Vue.extend({
  components: {
    NavBar
  },
  methods: {
    handleNew(): void {
      this.$router.push('new')
    }
  }
})
</script>

<style scoped>
.view-main {
  padding: 1.5rem;
  margin-bottom: 4rem;
}
.container {
  display: flex;
  justify-content: flex-end;
}
</style>
