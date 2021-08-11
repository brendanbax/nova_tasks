<template>
  <div class="view-container">
    <TopBar title="Task Details" @left="handleBack" @right="handleEdit">
      <template v-slot:left-action>Back</template>
      <template v-slot:right-action>Edit</template>
    </TopBar>
    <h2>{{ title }}</h2>
    <p>{{ body }}</p>
    <p>{{ creationDate }}</p>
    <div>
      <Tag v-for="(tag, index) in tags" :key="`${id}-${index}`" :text="tag" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TopBar from '@/components/TopBar.vue'
import { ITask } from '@/interfaces/ITask'
import { GET_TASK } from '@/store/actionTypes'
import Tag from '@/components/Tag.vue'

export default Vue.extend({
  components: {
    TopBar,
    Tag
  },
  data() {
    return {
      task: {} as ITask
    }
  },
  created() {
    this.getTask()
  },
  computed: {
    id(): string | undefined {
      return this.task.id
    },
    title(): string {
      return this.task.title
    },
    body(): string | undefined {
      return this.task.body
    },
    creationDate(): string {
      if (this.task.creationDate) {
        return this.convertDate(this.task.creationDate)
      } else {
        return ''
      }
    },
    dueDate(): string {
      if (this.task.dueDate) {
        return this.convertDate(this.task.dueDate)
      } else {
        return ''
      }
    },
    tags(): Array<string> | undefined {
      return this.task.tags
    },
    status(): string | undefined {
      return this.task.status
    }
  },
  methods: {
    getTask() {
      const id = this.$route.params.id
      this.task = this.$store.getters[GET_TASK](id)
    },
    convertDate(date: Date): string {
      return date.toString().split(' ').slice(1, 4).join()
    },
    handleBack(): void {
      this.$router.go(-1)
    },
    handleEdit(): void {
      this.$router.push(`/tasks/${this.id}/edit`)
    }
  }
})
</script>

<style scoped></style>
