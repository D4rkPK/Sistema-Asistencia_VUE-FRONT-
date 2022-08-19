import Vue from 'vue'
import VueRouter from 'vue-router'

//HOME
import Home from '../views/home/home.vue';

// AUTH 
import Login from '../views/auth/login.vue';

// DASHBOARD
import Dashboard from '../views/dashboard/dashboard.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
