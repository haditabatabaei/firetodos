import Vue from 'vue'
import VueRouter from 'vue-router'

import Default from '@/layouts/Default.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import User from '@/views/User.vue'
import Home from '@/views/Home.vue'

import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Default',
    component: Default,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
        meta: {
          isAuthRequired: false
        }
      },
      {
        path: 'login',
        name: 'login',
        component: Login,
        meta: {
          isAuthRequired: false
        }
      },
      {
        path: 'user',
        name: 'user',
        component: User,
        meta: {
          isAuthRequired: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const userIsLoggedIn = store.getters['auth/isLoggedIn']
  // eslint-disable-next-line no-prototype-builtins
  if (to.meta && to.meta.hasOwnProperty('isAuthRequired')) {
    if (to.meta.isAuthRequired) {
      userIsLoggedIn ? next() : next('/login')
    } else {
      userIsLoggedIn ? next('/') : next()
    }
  } else {
    next()
  }
})

export default router
