<template>
  <div class="view-container">
    <TopBar :title="currentView" :showLeft="false" @right="handleNew">
      <template v-slot:right-action>New Task</template>
    </TopBar>
    <router-view class="mt-5 mb-5" />
    <NavBar />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TopBar from '@/components/TopBar.vue'
import NavBar from '@/components/NavBar.vue'

export default Vue.extend({
  components: {
    TopBar,
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
</style>
