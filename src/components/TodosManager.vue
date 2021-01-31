<template>
  <div class="manager">
    <h2 class="manager__title">Your Todos:</h2>
    <aside class="manager__sidebar">
      <h4 class="form__title">Create todo</h4>
      <hr>
      <form class="manager__form" @submit.prevent="onSubmit">
        <label class="form__label">
          <span class="form__label__name">Title *:</span>
          <input
            class="form__input"
            type="text"
            v-model="$v.newTodo.title.$model"
            placeholder="Enter title here..."
          />
          <p class="form__label__error" v-if="$v.newTodo.title.$error">
            Please provide a valid title [required].
          </p>
      </label>
        <button class="form__submit">Create</button>
    </form>
    </aside>
    <main class="manager__items" v-if="todos.length != 0">
      <todo-item @removeTodo="removeTodo" v-for="(todo, index) in todos" :key="index" :todo="todo"></todo-item>
    </main>
    <main class="manager__items" v-else>
      <p>You dont have any todos yet. start creating from sidebar.</p>
    </main>
  </div>
</template>

<script>
import { todosCollection, auth } from '@/plugins/firebase'
import TodoItem from '@/components/TodoItem.vue'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'TodosManager',
  data () {
    return {
      todos: [],
      newTodo: {
        title: ''
      }
    }
  },
  validations: {
    newTodo: {
      title: { required, minLength: minLength(1), maxLength: maxLength(255) }
    }
  },
  components: {
    TodoItem
  },
  computed: {},
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.newTodo.$invalid) {
        this.createTodo({
          title: this.newTodo.title,
          creator: auth.currentUser.uid,
          created: (new Date()).toISOString()
        })
      }
    },
    async removeTodo (todoToRemove) {
      try {
        this.$loading(true)
        await todosCollection.doc(todoToRemove.id).delete()
        this.todos = this.todos.filter(currentTodo => currentTodo.id !== todoToRemove.id)
        this.$toasted.success('Todo removed.')
      } catch (e) {
        console.log(e)
      } finally {
        this.$loading(false)
      }
    },

    async createTodo (newTodo) {
      try {
        this.$loading(true)
        const { id } = await todosCollection.add(newTodo)
        console.log('created todo result id = ', id)
        this.todos.push({
          ...newTodo,
          id
        })
        this.newTodo.title = ''
        this.$toasted.success('Todo added.')
      } catch (e) {
        console.log(e)
      } finally {
        this.$loading(false)
      }
    },

    fetchTodos () {
      console.log('auth cu uid = ', auth.currentUser.uid)
      this.$loading(true)
      todosCollection.where('creator', '==', auth.currentUser.uid)
        .get()
        .then((querySnapshot) => {
          console.log('snapshot = ', querySnapshot)
          this.todos = []
          querySnapshot.forEach((todo) => {
            this.todos.push({ ...todo.data(), id: todo.id })
          })
          console.log(this.todos)
        })
        .finally(() => {
          this.$loading(false)
        })
    }
  },
  created () {
    this.fetchTodos()
  }
}
</script>

<style scoped>
.manager {
  width: 100%;
  max-width: 1200px;
  margin: 25px auto;
  display: grid;
  grid-template-areas: 'title title' 'main sidebar';
  grid-template-columns: 3fr 1fr;
  grid-gap: 20px;
}
.manager__title {
  text-align: center;
  font-size: 2rem;
  grid-area: title;
  margin-bottom: 20px;
}

.manager__sidebar {
  grid-area: sidebar;
}

.manager__items {
  grid-area: main;
}

.form__label {
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
}

.form__label__name {
  margin-bottom: 5px;
}

.form__input {
  border-radius: 5px;
  border: none;
  background-color: #124E78;
  color: #F0F0C9;
  outline: none;
  padding: 10px 5px;
  font-size: 1.2rem;
}

.form__input::placeholder {
  color: #F0F0C9;
}

.manager__form {
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
  align-items: stretch;
}

.form__submit {
  background-color: #D74E09;
  color: white;
  font-size: 1.2rem;
  border-radius: 5px;
  border: none;
  padding: 10px 0;
  cursor: pointer;
}

.form__label__error {
  color: #6E0E0A;
  font-size: 1rem;
  margin-top: 5px;
}
</style>
