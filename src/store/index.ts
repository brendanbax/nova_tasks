import Vue from 'vue'
import Vuex from 'vuex'
import { ITask } from '@/interfaces/ITask'
import { ISummary } from '@/interfaces/ISummary'
import TaskList from '@/classes/TaskList'
import TaskTypes from '@/store/actionTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: Array<ITask>()
  },
  mutations: {
    addTask(state, task: ITask) {
      state.tasks.push(task)
    },
    updateTask(state, task: ITask) {
      state.tasks = TaskList.updateTasks(state.tasks, task)
    }
  },
  actions: {
    [TaskTypes.ADD_TASK](context, task: ITask) {
      context.commit('addTask', task)
    },
    [TaskTypes.UPDATE_TASK](context, task: ITask) {
      context.commit('updateTask', task)
    }
  },
  getters: {
    [TaskTypes.GET_TASK](state, taskId: string) {
      return TaskList.getTaskById(state.tasks, taskId)
    },
    [TaskTypes.GET_TASKS](state): Array<ITask> {
      return state.tasks
    },
    [TaskTypes.GET_TASK_SUMMARY](state): Array<ISummary> {
      return TaskList.getStatusSummary(state.tasks)
    }
  }
  // modules: {}
  // don't need modules for now, so ignoring
})
