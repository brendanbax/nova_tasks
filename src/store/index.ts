import Vue from 'vue'
import Vuex from 'vuex'
import { ITask } from '@/interfaces/ITask'
import { ISummary } from '@/interfaces/ISummary'
import { IResponse } from '@/interfaces/IResponse'
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
    },
    setTasks(state, tasks: Array<ITask>) {
      state.tasks = tasks
    }
  },
  actions: {
    [ActionTypes.ADD_TASK](context, task: ITask) {
      context.commit('addTask', task)
    },
    [ActionTypes.UPDATE_TASK](context, task: ITask) {
      context.commit('updateTask', task)
    },
    async [ActionTypes.SET_LOCAL_STATE](): Promise<IResponse> {
      const localStorage = window.localStorage
      if (localStorage) {
        try {
          const tasks = JSON.stringify(this.state.tasks)
          localStorage.setItem('tasks', tasks)
          return {
            status: 0,
            message: 'success'
          }
        } catch (e) {
          return {
            status: 1,
            message: e.message
          }
        }
      } else {
        return {
          status: 1,
          message: 'no access to local storage'
        }
      }
    },
    async [ActionTypes.GET_LOCAL_STATE](context): Promise<IResponse> {
      const localStorage = window.localStorage
      if (localStorage) {
        try {
          const localTasks = localStorage.getItem('tasks')
          if (localTasks) {
            const tasks = JSON.parse(localTasks)
            context.commit('setTasks', tasks)
            return {
              status: 0,
              message: 'success'
            }
          } else {
            throw new Error()
          }
        } catch (e) {
          return {
            status: 1,
            message: e.message
          }
        }
      } else {
        return {
          status: 1,
          message: 'no access to local storage'
        }
      }
    }
  },
  getters: {
    [ActionTypes.GET_TASK](state, taskId: string): ITask {
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
})
