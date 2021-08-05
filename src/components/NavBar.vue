<template>
  <nav>
    <router-link class="nav-item" to="/">Home</router-link>
    <router-link class="nav-item" to="/list">List</router-link>
    <router-link class="nav-item" to="/calendar">Calendar</router-link>
    <router-link class="nav-item" to="/new">New</router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'NavBar'
})
export default class extends Vue {}
</script>

<style scoped>
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
</style>
