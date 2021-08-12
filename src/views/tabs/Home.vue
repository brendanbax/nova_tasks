<template>
  <div class="mosaic">
    <TaskSummary
      v-for="(item, index) in taskRollups"
      :key="item.status"
      :count="item.total"
      :category="item.status"
      class="mosaic-item"
      :class="getClass(index + 1)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ISummary } from '@/interfaces/ISummary'
import Task from '@/classes/Task'
import TaskSummary from '@/components/TaskSummary.vue'

export default Vue.extend({
  components: {
    TaskSummary
  },
  computed: {
    taskRollups(): Array<ISummary> {
      const summaries = this.$store.getters.GET_TASK_SUMMARY
      // hardcoding the order for now... in the future this can just be dynamic
      // will need to trim the options from Task.statusOptions()
      // and remove the select options from the task form... or generate them programatically
      const todo = summaries.find((el: ISummary) => el.status.toLowerCase() === 'to do')
      const inprog = summaries.find((el: ISummary) => el.status.toLowerCase() === 'in progress')
      const done = summaries.find((el: ISummary) => el.status.toLowerCase() === 'done')
      const archive = summaries.find((el: ISummary) => el.status.toLowerCase() === 'archive')
      const unclass = summaries.find((el: ISummary) => el.status.toLowerCase() === 'unclassified')
      return [todo, inprog, done, archive, unclass]
    }
  },
  methods: {
    getClass(index: number): string {
      if (index === 5) return 'mz-5'
      if (index === 4) return 'mz-4'
      if (index === 3) return 'mz-3'
      if (index === 2) return 'mz-2'
      if (index === 1) return 'mz-1'
      return 'mz-6'
    }
  }
})
</script>

<style scoped>
.mosaic {
  display: flex;
  flex-wrap: wrap;
}
.mosaic-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
  width: calc(50% - 0.5rem);
}

.mz-1 {
  height: 100px;
}
.mz-2 {
  height: 200px;
  margin-left: 1rem;
}
.mz-3 {
  height: 200px;
  margin-top: -100px;
}
.mz-4 {
  height: 100px;
  margin-left: 1rem;
}
.mz-5 {
  height: 100px;
  width: 100%;
}
</style>
