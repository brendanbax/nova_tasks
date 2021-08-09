<template>
  <div id="app">
    <router-view />
    <NavBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { GET_LOCAL_STATE } from '@/store/actionTypes'
import '@/styles/reset.css'
import '@/styles/vars.css'
import NavBar from '@/components/NavBar.vue'

@Component({
  components: {
    NavBar
  },
  mounted() {
    this.$store.dispatch(GET_LOCAL_STATE)
  }
})
export default class extends Vue {}
</script>

<style>
body {
  background: radial-gradient(circle at top, var(--blue-700), var(--blue-900)) no-repeat;
  min-height: 100vh;
}
#app {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
