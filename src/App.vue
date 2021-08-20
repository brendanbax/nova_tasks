<template>
  <div>
    <div id="install-action" class="tile app-container" v-if="showInstall">
      <button class="button button-primary" @click="installer()">Install</button>
      <p class="light body ml-4">Tap install to use Task Master offline.</p>
      <button id="close-btn" class="light" @click="handleClose">&times;</button>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GET_LOCAL_STATE } from '@/store/actionTypes'
import { IBeforeInstall } from '@/interfaces/IBeforeInstall'
import '@/styles/reset.css'
import '@/styles/vars.css'
import '@/styles/global.css'

export default Vue.extend({
  data() {
    return {
      showInstall: false,
      installer: () => null
    }
  },
  created(): void {
    this.$store.dispatch(GET_LOCAL_STATE)

    // Handle PWA prompt
    // Var to store install prompt event
    let installPrompt: IBeforeInstall | null

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome and earlier from auto showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      installPrompt = e
      // Show element in the UI
      this.showInstall = true
    })

    this.installer = () => {
      // Hide element
      this.showInstall = false
      // Show prompt
      if (installPrompt) {
        installPrompt.prompt()
        // Wait for user to respond
        // This is a TS thing too... when destructuring an object as a parameter for a function...
        // You will need to define the TYEP of the value... but you can't do { outcome: string } b/c it's treated as a value
        // Instead you can type the destructured object via { key }: { key: type } as per below
        installPrompt.userChoice.then(({ outcome }: { outcome: string }) => {
          if (outcome === 'accepted') {
            console.log('User accepted')
          } else {
            console.log('User denied')
          }
          installPrompt = null
        })
      }
      return null
    }
  },
  methods: {
    handleClose() {
      this.showInstall = false
    }
  }
})
</script>

<style scoped>
#install-action {
  align-items: center;
  display: flex;
  margin: 0 1.5rem;
  position: relative;
  top: 4rem;
  z-index: 1001;
}
#close-btn {
  background-color: var(--green-100);
  border-radius: 50%;
  color: var(--blue-900);
  font-size: 1.25rem;
  height: 1.5rem;
  position: absolute;
  right: -0.25rem;
  top: -0.25rem;
  width: 1.5rem;
}
</style>
