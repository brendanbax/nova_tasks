<template>
  <div id="app">
    <TopBar />
    <router-view />
    <NavBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { GET_LOCAL_STATE } from '@/store/actionTypes'
import '@/styles/reset.css'
import '@/styles/vars.css'
import '@/styles/global.css'
import NavBar from '@/components/NavBar.vue'
import TopBar from '@/components/TopBar.vue'

@Component({
  components: {
    NavBar,
    TopBar
  },
  created() {
    this.$store.dispatch(GET_LOCAL_STATE)
  }
})
export default class extends Vue {}
</script>

<style>
#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
</style>
