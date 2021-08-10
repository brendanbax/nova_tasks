import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// Views
import Main from '@/views/Main.vue'
import Home from '@/views/Home.vue'
import List from '@/views/List.vue'
import Calendar from '@/views/Calendar.vue'
import Alerts from '@/views/Alerts.vue'
import Details from '@/views/Details.vue'
import New from '@/views/New.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: '',
    component: Main,
    children: [
      {
        path: 'list',
        component: List
      },
      {
        path: 'calendar',
        component: Calendar
      },
      {
        path: 'alerts',
        component: Alerts
      },
      {
        path: '',
        component: Home
      }
    ]
  },
  {
    path: '/tasks/:id',
    name: 'Task',
    component: Details
  },
  {
    path: '/new',
    name: 'New',
    component: New
  }
  /*{
    path: '/about',
    name: 'About',
    route level code-splitting
    this generates a separate chunk (about.[hash].js) for this route
    which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue') //* webpackChunkName: "about" 
  }*/
]

const router = new VueRouter({
  routes
})

export default router
