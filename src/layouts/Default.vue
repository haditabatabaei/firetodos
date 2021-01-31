<template>
  <section>
      <nav-menu></nav-menu>
      <router-view></router-view>
  </section>
</template>

<script>
import Menu from '@/components/Menu.vue'
export default {
  name: 'Default',
  components: {
    'nav-menu': Menu
  }
}
</script>

<style scoped>

</style>
