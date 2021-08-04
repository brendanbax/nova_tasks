<template>
  <div>
    <button @click="makeTask">Make A Task</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Task from "@/classes/Task";
import ITask from "@/interfaces/Task";

@Component
export default class extends Vue {
  makeTask(): ITask {
    let taskDetails = {
      title: "Task Title",
    };
    let newTask = new Task(taskDetails);
    console.log(newTask);
    newTask.body = "Bananas";
    return newTask;
  }
}
</script>
