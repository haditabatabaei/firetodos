<template>
  <section class="section">
      <div class="section__container">
          <slot></slot>
      </div>
  </section>
</template>

<script>
export default {
  name: 'SectionContainer'
}
</script>

<style scoped>
  .section {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
  }

  .section__container {
    box-sizing: border-box;
    width: 100%;
    max-width: 1200px;
    padding: 0 15px;
  }
</style>
