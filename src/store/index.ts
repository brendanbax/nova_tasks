import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { ADD_TASK } from '@/store/type'
import IRootState from '@/interfaces/RootState'

Vue.use(Vuex)

const store: StoreOptions<IRootState> = {
  state: {
    tasks: []
  },
  mutations: {
    [ADD_TASK](state, payload) {
      state.tasks.push(payload)
    }
  },
  actions: {
    addTask(context, task) {
      context.commit(ADD_TASK, task)
    }
  }
  // modules: {}
  // don't need modules for now, so ignoring
}

export default new Vuex.Store<IRootState>(store)
