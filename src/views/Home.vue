<template>
    <div>
      <section-container>
        <h1 class="title">
          <img src="../assets/firebaselogo.png" alt="Firebase Logo">
           Todos
        </h1>
      </section-container>
      <section-container v-if="isLoggedIn">
        <p class="account__text">WELCOME {{ user.email }}</p>
        <todos-manager></todos-manager>
      </section-container>
      <section-container v-else>
        <p class="account__text">You need an account to fire your todos!</p>
        <p class="account__navigate">
        <router-link class="account__link" to="/login">Login</router-link>
        OR
        <router-link class="account__link" to="/register">Register</router-link>
        </p>
      </section-container>
    </div>
</template>

<script>
import SectionContainer from '@/components/reusables/SectionContainer.vue'
import TodosManager from '@/components/TodosManager.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    SectionContainer,
    TodosManager
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      user: 'auth/user'
    })
  }
}
</script>

<style scoped>
  .title {
    font-size: 3.5rem;
    text-align: center;
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .account__text {
    text-align: center;
    margin-top: 15px;
  }

  .account__navigate {
    text-align: center;
    margin-top: 5px;
  }

  .account__link {
    color: #124E78;
    font-weight: bold;
  }
</style>
