<template>
  <div class="mosaic" v-if="taskRollups.length > 0">
    <TaskSummary
      v-for="(item, index) in taskRollups"
      :key="item.status"
      :count="item.total"
      :category="item.status"
      class="mosaic-item"
      :class="getClass(index + 1)"
      @click="handleClick(item.status)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ISummary } from '@/interfaces/ISummary'
import TaskSummary from '@/components/TaskSummary.vue'

export default Vue.extend({
  components: {
    TaskSummary
  },
  data() {
    return {
      taskRollups: [] as Array<ISummary>
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
    },
    getTaskRollups(): void {
      const summaries = this.$store.getters.GET_TASK_SUMMARY
      if (summaries.length) {
        const todo = summaries.find((el: ISummary) => el.status.toLowerCase() === 'to do') || { status: 'To Do', total: 0 }
        const inprog = summaries.find((el: ISummary) => el.status.toLowerCase() === 'in progress') || { status: 'In Progress', total: 0 }
        const done = summaries.find((el: ISummary) => el.status.toLowerCase() === 'done') || { status: 'Done', total: 0 }
        const archive = summaries.find((el: ISummary) => el.status.toLowerCase() === 'archive') || { status: 'Archive', total: 0 }
        const unclass = summaries.find((el: ISummary) => el.status.toLowerCase() === 'unclassified') || { status: 'Unclassified', total: 0 }
        this.taskRollups = [todo, inprog, done, archive, unclass]
      }
    },
    handleClick(status: string): void {
      const param = status.split(' ').join('-').toLowerCase()
      this.$router.push({ path: '/list', query: { filter: param } })
    }
  },
  mounted(): void {
    this.getTaskRollups()
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
