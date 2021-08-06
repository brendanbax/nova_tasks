import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// Views
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import Calendar from '../views/Calendar.vue'
import New from '../views/New.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new',
    name: 'New',
    component: New
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
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
