import Vue from 'vue'
import Vuex from 'vuex'
import { ITask } from '@/interfaces/ITask'
import { ISummary } from '@/interfaces/ISummary'
import TaskList from '@/classes/TaskList'
import ActionTypes from '@/store/actionTypes'

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
    [ActionTypes.ADD_TASK](context, task: ITask) {
      context.commit('addTask', task)
    },
    [ActionTypes.UPDATE_TASK](context, task: ITask) {
      context.commit('updateTask', task)
    }
  },
  getters: {
    [ActionTypes.GET_TASK](state, taskId: string) {
      return TaskList.getTaskById(state.tasks, taskId)
    },
    [ActionTypes.GET_TASKS](state): Array<ITask> {
      return state.tasks
    },
    [ActionTypes.GET_TASK_SUMMARY](state): Array<ISummary> {
      return TaskList.getStatusSummary(state.tasks)
    },
    [ActionTypes.GET_BY_CREATED_ASC](state): Array<ITask> {
      return TaskList.sortByCreated(state.tasks, 'asc')
    },
    [ActionTypes.GET_BY_CREATED_DESC](state): Array<ITask> {
      return TaskList.sortByCreated(state.tasks, 'desc')
    },
    [ActionTypes.GET_BY_DUE_ASC](state): Array<ITask> {
      return TaskList.sortByDue(state.tasks, 'asc')
    },
    [ActionTypes.GET_BY_DUE_DESC](state): Array<ITask> {
      return TaskList.sortByDue(state.tasks, 'desc')
    },
    [ActionTypes.GET_BY_STATUS](state, status: string): Array<ITask> {
      return TaskList.filterByStatus(state.tasks, status)
    },
    [ActionTypes.GET_BY_TAGS](state, tags: Array<string>): Array<ITask> {
      return TaskList.filterByTags(state.tasks, tags)
    }
  }
  // modules: {}
  // don't need modules for now, so ignoring
})
