<template>
  <nav id="nav-bar">
    <router-link class="nav-item" to="/"><IconHome /><label>Home</label></router-link>
    <router-link class="nav-item" to="/list" exact-path><IconList /><label>List</label></router-link>
    <router-link class="nav-item" to="/calendar"><IconCalendar /><label>Calendar</label></router-link>
    <router-link class="nav-item" :class="hasAlert" to="/alerts"><IconAlert /><label>Alerts</label></router-link>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import IconHome from './icons/IconHome.vue'
import IconList from './icons/IconList.vue'
import IconCalendar from './icons/IconCalendar.vue'
import IconAlert from './icons/IconAlert.vue'

export default Vue.extend({
  name: 'NavBar',
  components: { IconHome, IconList, IconCalendar, IconAlert },
  computed: {
    hasAlert(): string {
      const hasAlert = true
      return hasAlert ? 'alert' : ''
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
