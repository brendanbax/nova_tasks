<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { GET_LOCAL_STATE } from '@/store/actionTypes'
import '@/styles/reset.css'
import '@/styles/vars.css'
import '@/styles/global.css'
import NavBar from '@/components/NavBar.vue'

@Component({
  components: {
    NavBar
  },
  created() {
    this.$store.dispatch(GET_LOCAL_STATE)
  }
})
export default class extends Vue {}
</script>

<style></style>
