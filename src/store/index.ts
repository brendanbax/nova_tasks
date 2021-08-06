import Vue from 'vue'
import Vuex from 'vuex'
import { TaskModel } from '@/classes/Task'
import TaskList from '@/classes/TaskList'
import { ADD_TASK, UPDATE_TASK } from '@/store/actionTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: Array<TaskModel>()
  },
  mutations: {
    addTask(state, task: TaskModel) {
      state.tasks.push(task)
    },
    updateTask(state, task: TaskModel) {
      state.tasks = TaskList.updateTasks(state.tasks, task)
    }
  },
  actions: {
    [ADD_TASK](context, task: TaskModel) {
      context.commit('addTask', task)
    },
    [UPDATE_TASK](context, task: TaskModel) {
      context.commit('updateTask', task)
    }
  }
  // modules: {}
  // don't need modules for now, so ignoring
})
