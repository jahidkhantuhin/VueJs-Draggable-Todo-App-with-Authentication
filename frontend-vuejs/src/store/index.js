import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import router from '@/router/index'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.idToken
      state.userId = userData.userId
  },
    clearAuthData (state) {
      state.idToken= null,
      state.userId= null
  }
  },
  actions: {
    signup: ({commit, dispatch}, authData) => {
      axios.put('http://localhost:7070/signup',{
         email: authData.email,
         password: authData.password,
         name: authData.name
        })
       .then(res => { 
          console.log(res)
          commit('signUpAuthUser', {
              idToken: res.data.token}),
          dispatch('storeUser', authData)
        })
        .catch(err => {
          console.log(err)
          if (err) {
            if (confirm('This email is alreday used. Please provide different one. :)')) {
              router.replace('/signup')
            }
          }
        })
        router.replace('/signin') 
  },
  signUserIn ({commit, dispatch}, authData) {
      axios.post('http://localhost:7070/login',{
         email: authData.email,
         password: authData.password
        })
        .then(res => { 
          console.log(res)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userId', res.data.userId)
          const remainingMilliseconds = 60 * 60 * 1000;
          const expirationDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expirationDate', expirationDate.toISOString());
          dispatch('autoLogOut', remainingMilliseconds)
          commit('authUser', {
             idToken: res.data.token,
             userId: res.data.userId
         })
         router.replace('/')
      })
      .catch(err => {
        console.log(err)
        if (err) {
          if (confirm('Sorry, Invalid email or password :) !!! If you want to register then hit ok button......')) {
            router.push('/signup');
          } else {
            location.reload();
          }
        }
      })  
  },
  resetPassword (commit, authData) {
    axios.post('http://localhost:7070/reset',{
       email: authData.email
      })
      .then(res => { 
        console.log(res)
        commit()
    })
    .catch()
    router.replace('/auth-message')    
},
updatePassword (commit, authData) {
  axios.post('http://localhost:7070/update-password',{
     token: authData.token,
     password: authData.password
    })
    .then(res => { 
      console.log(res)
      commit()
     router.replace('/')
    })
    .catch(err => {
      console.log(err)
    })
    router.replace('/signin')    
},

  autoLogin({commit}) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const expirationDate = localStorage.getItem('expirationDate')
    const now = new Date()
    if(!token) {
      return
    }
    if(now >= expirationDate) {
      return
    }
    commit('authUser', {
      idToken: token,
      userId: userId
    })
    router.replace('/')
  },

  logOut: ({commit}) => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    commit('clearAuthData')
    router.replace('/signin')
  },

  autoLogOut ({commit}, expirationTime) {
    setTimeout(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationDate')
      commit('clearAuthData')
      router.replace('/signin')
    }, expirationTime)
  }
  },

  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.userId !== null
    },
    idToken (state) {
      return state.idToken
    },
    userId (state) {
      return state.userId
    }
  },
  
  modules: {
  }
})
