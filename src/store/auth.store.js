import { auth, usersCollection } from '@/plugins/firebase'
import router from '@/router/index'

export default {
  namespaced: true,
  state () {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {}
    }
  },
  mutations: {
    setUser (state, newUser) {
      state.user = newUser
      localStorage.setItem('user', JSON.stringify(newUser))
    }
  },
  actions: {
    async login ({ dispatch, commit }, { userToLogin, vm }) {
      try {
        vm.$loading(true)
        const { user } = await auth.signInWithEmailAndPassword(userToLogin.email, userToLogin.password)
        console.log('logged in user=', user)
        vm.$loading(false)
        router.push('/')
      } catch (e) {
        console.log(e)
        if (e.message) {
          vm.$toasted.error(e.message)
        }
        vm.$loading(false)
      }
    },

    async updateUserInDatabase (_, { uid, userToUpdate, vm }) {
      await usersCollection.doc(uid).set(userToUpdate)
    },

    async register ({ dispatch }, { userToRegister, vm }) {
      try {
        vm.$loading(true)
        const { user } = await auth.createUserWithEmailAndPassword(userToRegister.email, userToRegister.password)
        await dispatch('updateUserInDatabase', { uid: user.uid, userToUpdate: { name: userToRegister.name } })
        console.log('logged in user =', user)
        vm.$loading(false)
        router.push('/')
      } catch (e) {
        console.log(e)
        if (e.message) {
          console.log(e.message)
          vm.$toasted.error(e.message)
        }
        vm.$loading(false)
      }
    },

    async logout (_, { vm }) {
      console.log('logout action invoked.')
      await auth.signOut()
      router.push('/login')
      vm.$toasted.success('Logout Successful.')
    }
  },
  getters: {
    isLoggedIn: state => Object.keys(state.user).length > 0,
    user: state => state.user
  }
}
