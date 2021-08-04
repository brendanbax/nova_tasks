<template>
  <div>
    <h1>Not Class Example</h1>
    <p>{{ message }}</p>
    <p>{{ fullName }}</p>
    <p>{{ count }}</p>
    <button @click="handleClick">Increment</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NotClassComponent',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      count: 0,
      first: 'Brendan',
      last: 'Bax'
    }
  },
  computed: {
    fullName(): string {
      return `${this.first} ${this.last}`
    }
  },
  methods: {
    handleClick(): number {
      return this.count++
    }
  }
})
</script>

<style scoped></style>
