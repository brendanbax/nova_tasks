<template>
  <div class="view-container">
    <div class="row-container">
      <h1 class="title">{{ currentView }}</h1>
      <button @click="handleNew">Add Task</button>
    </div>
    <router-view class="tab-view" />
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
  computed: {
    currentView(): string | null | undefined {
      return this.$route.name
    }
  },
  methods: {
    handleNew(): void {
      this.$router.push('new')
    }
  }
})
</script>

<style scoped>
.row-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.tab-view {
  margin-top: 1.5rem;
  margin-bottom: 4rem;
}
</style>
