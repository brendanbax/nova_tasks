<template>
  <div class="app-container">
    <button class="label light flex-row w-100 pointer" @click="toggleList">{{ toggleText }}<IconCollapse v-if="showListMenu" /><IconExpand v-else /></button>
    <div class="flex-wrap mb-2">
      <Tag v-for="(filter, index) in activeFilters" :key="`active-option-${index}`" :text="filter" />
    </div>
    <div v-if="showListMenu" class="light">
      <!-- Filter by status... -->
      <div class="form-row">
        <div class="flex-row">
          <label for="status-filter" class="block label ml-2">Filter by Status</label>
          <button @click.prevent="removeFilter" class="mb-2 pointer">Clear</button>
        </div>
        <select v-model="activeFilter" id="status-filter" class="capitalize" @change="updateRoute">
          <option v-for="(option, index) in filterOptions" :key="`filter-option-${index}`">{{ option }}</option>
        </select>
      </div>
      <!-- Sort by dates... -->
      <div class="form-row">
        <label for="date-filter" class="block label ml-2">Sort by Dates</label>
        <select v-model="sortingSelection" id="status-filter" class="capitalize" @change="updateRoute">
          <option v-for="(option, index) in sortingOptions" :key="`date-option-${index}`">{{ option }}</option>
        </select>
      </div>
      <!-- Search for tags... -->
      <div class="form-row mb-5">
        <div class="flex-row">
          <label for="searchText" class="block label ml-2">Search By Tag</label>
          <button @click.prevent="removeSearch" class="mb-2 pointer">Clear</button>
        </div>
        <input id="searchText" type="text" v-model="searchText" @change="updateRoute" />
        <p class="micro helptext mt-2 ml-2">Separate tags with commas</p>
      </div>
    </div>
    <TaskItem v-for="task in taskList" :key="task.index" :task="task" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ITask } from '@/interfaces/ITask'
import Task from '@/classes/Task'
import TaskList from '@/classes/TaskList'
import TaskItem from '@/components/TaskItem.vue'
import Tag from '@/components/Tag.vue'
import IconCollapse from '@/components/icons/IconCollapse.vue'
import IconExpand from '@/components/icons/IconExpand.vue'

export default Vue.extend({
  name: 'TaskList',
  components: {
    TaskItem,
    Tag,
    IconCollapse,
    IconExpand
  },
  data() {
    return {
      showListMenu: false,
      activeFilter: '',
      sortingSelection: 'due date (asc)',
      searchText: '',
      sortingOptions: ['creation date (desc)', 'creation date (asc)', 'due date (desc)', 'due date (asc)']
    }
  },
  computed: {
    taskList(): Array<ITask> {
      let masterList: Array<ITask>
      // Get a sorted list of tasks
      if (this.sortingSelection.includes('creation') && this.sortingSelection.includes('desc')) {
        masterList = this.$store.getters.GET_BY_CREATED_DESC
      } else if (this.sortingSelection.includes('creation') && this.sortingSelection.includes('asc')) {
        masterList = this.$store.getters.GET_BY_CREATED_ASC
      } else if (this.sortingSelection.includes('due') && this.sortingSelection.includes('desc')) {
        masterList = this.$store.getters.GET_BY_DUE_DESC
      } else if (this.sortingSelection.includes('due') && this.sortingSelection.includes('asc')) {
        masterList = this.$store.getters.GET_BY_DUE_ASC
      } else {
        masterList = this.$store.getters.GET_TASKS
      }

      // If there's an active filter, filter the list...
      if (this.activeFilter) {
        const filteredList = [...masterList.filter((item) => item.status && item.status.toLowerCase() === this.activeFilter.toLowerCase())]
        masterList = filteredList
      }

      // If there's tag search criteria, filter the list...
      if (this.searchText) {
        const tags = Task.expandTags(this.searchText)
        const filteredList = [...TaskList.filterByTags(masterList, tags)]
        masterList = filteredList
      }

      return masterList
    },
    filterOptions(): Array<string> {
      return [...Task.statusOptions()]
    },
    activeFilters(): Array<string> {
      const filters: Array<string> = []

      if (this.activeFilter !== '' && this.activeFilter !== 'clear') {
        filters.push(this.activeFilter)
      }

      if (this.searchText !== '') {
        const filtered = Task.expandTags(this.searchText)
        filters.push(...filtered)
      }
      return filters
    },
    toggleText(): string {
      return this.showListMenu ? 'Hide Filter Options' : 'Show Filter Options'
    }
  },
  methods: {
    handleSort(val: string): void {
      this.sortingSelection = val
      this.updateRoute()
    },
    toggleList(): void {
      this.showListMenu = !this.showListMenu
    },
    removeFilter(): void {
      if (!this.activeFilter) return
      this.activeFilter = ''
      this.updateRoute()
    },
    removeSearch(): void {
      if (!this.searchText) return
      this.searchText = ''
      this.updateRoute()
    },
    updateRoute(): void {
      const queryObj = {
        filter: encodeURIComponent(this.activeFilter),
        sort: encodeURIComponent(this.sortingSelection),
        search: encodeURIComponent(this.searchText)
      }
      this.$router.replace({ path: '/list', query: queryObj })
    }
  },
  mounted(): void {
    const filterQuery = this.$route.query.filter ? decodeURIComponent(this.$route.query.filter as string) : ''
    const sortQuery = this.$route.query.sort ? decodeURIComponent(this.$route.query.sort as string) : 'due date (asc)'
    const searchQuery = this.$route.query.search ? decodeURIComponent(this.$route.query.search as string) : ''

    this.activeFilter = filterQuery.split('-').join(' ').toLowerCase()
    this.sortingSelection = sortQuery
    this.searchText = searchQuery
  }
})
</script>

<style scoped></style>
