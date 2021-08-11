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
    addTask(state, task: ITask): void {
      state.tasks.push(task)
    },
    updateTask(state, task: ITask): void {
      state.tasks = TaskList.updateTasks(state.tasks, task)
    },
    deleteTask(state, id: string): void {
      state.tasks = TaskList.deleteTask(state.tasks, id)
    },
    setTasks(state, tasks: Array<ITask>): void {
      state.tasks = tasks
    }
  },
  actions: {
    async [ActionTypes.ADD_TASK](context, task: ITask): Promise<IResponse> {
      context.commit('addTask', task)
      const status = await this.dispatch(ActionTypes.SET_LOCAL_STATE)
      return status
    },
    async [ActionTypes.UPDATE_TASK](context, task: ITask): Promise<IResponse> {
      context.commit('updateTask', task)
      const status = await this.dispatch(ActionTypes.SET_LOCAL_STATE)
      return status
    },
    async [ActionTypes.DELETE_TASK](context, id: string): Promise<IResponse> {
      context.commit('deleteTask', id)
      const status = await this.dispatch(ActionTypes.SET_LOCAL_STATE)
      return status
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
            const tasks = JSON.parse(localTasks).map((task: ITask) => {
              // Convert string dates to date objects
              if (task.creationDate) {
                task.creationDate = new Date(task.creationDate)
              }
              if (task.dueDate) {
                task.dueDate = new Date(task.dueDate)
              }
              return task
            })
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
    [ActionTypes.GET_BY_STATUS]:
      (state) =>
      (status: string): Array<ITask> => {
        return TaskList.filterByStatus(state.tasks, status)
      },
    [ActionTypes.GET_BY_TAGS]:
      (state) =>
      (tags: Array<string>): Array<ITask> => {
        return TaskList.filterByTags(state.tasks, tags)
      },
    [ActionTypes.GET_TASK]:
      (state) =>
      (id: string): ITask => {
        return TaskList.getTaskById(state.tasks, id)
      }
  }
})
