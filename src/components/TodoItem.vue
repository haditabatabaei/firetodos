<template>
  <div class="todo">
    <div class="todo__info">
      <p class="todo__title">{{ todo.title }}</p>
      <p class="todo__date">created: {{ new Date(todo.created) }}</p>
    </div>
   <button class="todo__remove" @click="removeTodo">X</button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object
    },
    data () {
      return {
        editMode: false
      }
    }
  },
  methods: {
    removeTodo () {
      this.$emit('removeTodo', this.todo)
    }
  }
}
</script>

<style scoped>
  .todo {
    background-color: #124E78;
    color: #F2BB05;
    padding: 10px 15px;
    border-radius: 5px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .todo__title {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .todo__remove {
    border: none;
    background: none;
    cursor: pointer;
    color: #F0F0C9;
    font-size: 1.2rem;
  }
</style>
