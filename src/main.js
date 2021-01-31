import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import VueLoading from 'vuejs-loading-plugin'
import Toasted from 'vue-toasted'

import api from './plugins/api'

import { auth } from './plugins/firebase'

Vue.config.productionTip = false
Vue.prototype.$api = api

Vue.use(Vuelidate)
Vue.use(Toasted, { duration: 2500 })
Vue.use(VueLoading, {
  dark: true,
  text: 'Loading...'
})

let app
auth.onAuthStateChanged((user) => {
  console.log('changed auth statue user = ', user)
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {
    // this is for fixing auth status after hard refresh
    store.commit('auth/setUser', { email: user.email })
  } else {
    store.commit('auth/setUser', {})
  }
})
