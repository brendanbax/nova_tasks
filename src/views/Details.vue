<template>
  <div class="view-container">
    <TopBar title="Task Details" @left="handleBack" @right="handleEdit">
      <template v-slot:left-action>&#10094; Back</template>
      <template v-slot:right-action>Edit</template>
    </TopBar>
    <div class="mt-5 details">
      <h2 class="title">{{ title }}</h2>
      <p v-if="body" class="body mt-4 formatted">{{ body }}</p>
      <dl v-if="status" class="mt-5">
        <dt class="label">Status</dt>
        <dd class="tag-container">
          <Tag :text="status" />
        </dd>
      </dl>
      <dl class="mt-5">
        <dt class="label">Creation Date</dt>
        <dd class="body">{{ creationDate }}</dd>
      </dl>
      <dl v-if="dueDate" class="mt-5">
        <dt class="label">Due Date</dt>
        <dd class="body">{{ dueDate }}</dd>
      </dl>
      <dl v-if="tags.length > 0" class="mt-5">
        <dt class="label">Tags</dt>
        <dd class="tag-container">
          <Tag v-for="(tag, index) in tags" :key="`${id}-${index}`" :text="tag" />
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ITask } from '@/interfaces/ITask'
import Dates from '@/classes/Dates'
import { GET_TASK } from '@/store/actionTypes'
import TopBar from '@/components/TopBar.vue'
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
        return Dates.dateToPretty(this.task.creationDate)
      } else {
        return ''
      }
    },
    dueDate(): string {
      if (this.task.dueDate) {
        return Dates.dateToPretty(this.task.dueDate)
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
    handleBack(): void {
      this.$router.go(-1)
    },
    handleEdit(): void {
      this.$router.push(`/tasks/${this.id}/edit`)
    }
  }
})
</script>

<style scoped>
.details {
  color: var(--gray-100);
}
.tag-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
