import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import New from '../views/New.vue'
// Samples
import ClassComponent from '../components/ClassComponent.vue'
import NotClassComponent from '../components/NotClassComponent.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new',
    name: 'NewTask',
    component: New
  },
  {
    path: '/class-example',
    name: 'Class Example',
    component: ClassComponent,
    props: {
      message: 'Message from router'
    }
  },
  {
    path: '/not-class-example',
    name: 'Not Class Example',
    component: NotClassComponent,
    props: {
      message: 'Message from router'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
