import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index'

import Home from '@/components/Home.vue'
import Signup from '@/components/Auth/signup.vue'
import Signin from '@/components/Auth/signin.vue'
import ResetPassword from '@/components/Auth/resetPassword.vue'
import AuthMessage from '@/components/Auth/auth-message.vue'
import UpdatePassword from '@/components/Auth/updatePassword.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/reset/:token',
    name: 'updatePassword',
    component: UpdatePassword
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  
  {
    path: '/reset',
    name: 'resetPassword',
    component: ResetPassword
  },
  {
    path: '/auth-message',
    name: 'auth-message',
    component: AuthMessage
  },
  {
    path: '/*',
    name: 'home',
    component: Home,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/signin')
      }
    }
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
