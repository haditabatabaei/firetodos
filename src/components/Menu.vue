<template>
  <nav class="menu">
    <ul class="menu__items">
      <li class="menu__item" v-for="(item, index) in items" :key="index">
        <router-link class="menu__link" :to="item.target">{{ item.name }}</router-link>
      </li>
    </ul>
    <ul class="menu__items">
      <li class="menu__item" v-for="(item, index) in authItems" :key="index">
        <router-link class="menu__link" :to="item.target">{{ item.name }}</router-link>
      </li>
      <li class="menu__item" v-if="isLoggedIn">
        <button class="menu__button" @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Menu',
  data () {
    return {
      items: [
        { name: 'Home', target: '/' }
      ],
      originalAuthItems: [
        { name: 'Login', target: '/login' },
        { name: 'Register', target: '/register' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      user: 'auth/user'
    }),
    authItems () {
      if (!this.isLoggedIn) {
        return this.originalAuthItems
      } else {
        return []
      }
    }
  },
  methods: {
    isMenuItemActive (menuItem) {
      return this.$route.path === menuItem.target
    },
    logout () {
      this.$store.dispatch('auth/logout', { vm: this })
    }
  }
}
</script>

<style scoped>
    .menu {
        background-color: #124E78;
        width: 100%;
        box-sizing: border-box;
        min-height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
    }

    .menu__items {
        display: flex;
        grid-gap: 15px;
    }

    .menu__link {
        color: #F0F0C9;
    }

    .menu__button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
      color: #F0F0C9;
    }
</style>
