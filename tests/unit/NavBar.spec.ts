import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import NavBar from '@/components/NavBar.vue'

const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(Vuex)
localVue.use(VueRouter)

describe('NavBar.vue', () => {
  let getters
  let store: any

  beforeEach(() => {
    getters = {
      GET_BY_OVERDUE: () => new Array(4)
    }
    store = new Vuex.Store({
      getters
    })
  })

  it('Renders a badge when tasks are overdue', () => {
    const wrapper = mount(NavBar, { router, store, localVue })
    const badge = wrapper.find('.alert')

    expect(badge.exists()).toBe(true)
  })
})
