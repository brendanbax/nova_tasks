<template>
  <div>
    <h1>Class Example</h1>
    <h2>{{ fullName }}</h2>
    <p>{{ message }}</p>
    <p>{{ counter }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
/*

  There are a few ways to handle props...

  Method 1: Declare props as a new props class (the Vue Canonical Way)
  const NewProps = Vue.extend({
    props: {
      message: {
        type: String,
        required: true,
      },
    },
  });

  then consume them in your component by exporting an extension of that class
  export default class extends NewProps {...}

  Method 2: Import the Prop decorator from vue-property-decorator
  @Prop({ type: String, required: true }) private message!: string;
*/

// Decorator function where child components are declared
@Component
export default class extends Vue {
  @Prop({ type: String, required: true }) private message!: string // defines a prop called message, that is a string (and is required)

  // define basic data properties. TS will infer the types because they are assigned a value
  firstName = 'Brendan'
  lastName = 'Bax'
  counter = 0

  // defines a computed property (as a getter) that returns a string value
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  // defines a method that modifies a value in the data
  // even though this function produces a side effect, it's best to return a value
  // so in this case we return this.counter++, and the side effect still happens
  increment(): number {
    return this.counter++
  }
}
</script>

<style scoped></style>
