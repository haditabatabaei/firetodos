import Vue from 'vue'
import Vuex from 'vuex'

import authModule from './auth.store'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {}
  },
  mutations: {},
  actions: {},
  modules: {
    auth: authModule
  }
})
