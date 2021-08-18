<template>
  <nav id="nav-bar" class="app-container">
    <router-link class="nav-item" to="/"><IconHome /><label>Home</label></router-link>
    <router-link class="nav-item" to="/list" exact-path><IconList /><label>List</label></router-link>
    <router-link class="nav-item" to="/board"><IconBoard /><label>Board</label></router-link>
    <router-link class="nav-item" :class="hasAlert" to="/overdue"><IconAlert /><label>Overdue</label></router-link>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import IconHome from './icons/IconHome.vue'
import IconList from './icons/IconList.vue'
import IconBoard from './icons/IconBoard.vue'
import IconAlert from './icons/IconAlert.vue'

export default Vue.extend({
  name: 'NavBar',
  components: { IconHome, IconList, IconBoard, IconAlert },
  computed: {
    hasAlert(): string {
      const alertCount = this.$store.getters.GET_BY_OVERDUE.length
      return alertCount > 0 ? 'alert' : ''
    }
  }
})
</script>

<style scoped>
#nav-bar {
  background-color: var(--blue-900);
  bottom: 0;
  color: var(--gray-300);
  display: flex;
  justify-content: space-evenly;
  left: 0;
  padding: 0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom));
  position: fixed;
  right: 0;
}
.nav-item {
  align-items: center;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0 0.5rem;
  position: relative;
  text-decoration: none;
  width: calc(100vw / 4);
}
.nav-item:visited {
  color: inherit;
}
.nav-item.alert::after {
  content: '';
  position: absolute;
  right: 50%;
  top: 0;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  transform: translateX(0.75rem);
  background: var(--green-500);
}
.nav-item > label {
  font-size: 0.875rem;
  line-height: 1rem;
}
/* TODO: Update this style */
.nav-item.router-link-exact-active {
  color: var(--green-500);
}
</style>
