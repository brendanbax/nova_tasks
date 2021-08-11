import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// Views
import Main from '@/views/Main.vue'
import Home from '@/views/tabs/Home.vue'
import List from '@/views/tabs/List.vue'
import Calendar from '@/views/tabs/Calendar.vue'
import Alerts from '@/views/tabs/Alerts.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: '',
    component: Main,
    children: [
      {
        path: 'list',
        name: 'Task List',
        component: List
      },
      {
        path: 'calendar',
        name: 'Task Calendar',
        component: Calendar
      },
      {
        path: 'alerts',
        name: 'Task Alerts',
        component: Alerts
      },
      {
        path: '',
        name: 'Task Home',
        component: Home
      }
    ]
  },
  {
    path: '/tasks/:id',
    name: 'Task',
    component: () => import('@/views/Details.vue')
  },
  {
    path: '/tasks/:id/edit',
    name: 'Edit Task',
    component: () => import('@/views/Edit.vue')
  },
  {
    path: '/new',
    name: 'New',
    component: () => import('@/views/New.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
