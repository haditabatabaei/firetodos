<template>
  <div>
      <section-container>
          <form class="form" @submit.prevent="register">
            <h1 class="form__title">Register with your email</h1>
            <label class="form__label">
              <span class="form__label__name">Email *:</span>
              <input class="form__input" type="email" v-model="$v.user.email.$model">
              <p class="form__label__error" v-if="$v.user.email.$error">Please provide a valid email [required].</p>
            </label>
            <label class="form__label">
              <span class="form__label__name">Name *:</span>
              <input class="form__input" type="text" v-model="$v.user.name.$model">
              <p class="form__label__error" v-if="$v.user.name.$error">Please provide a valid name [required].</p>
            </label>
            <label class="form__label">
              <span class="form__label__name">Password *:</span>
              <input class="form__input" type="password" v-model="$v.user.password.$model">
              <p class="form__label__error" v-if="$v.user.password.$error">Please provide a valid password [At least 6 characters].</p>
            </label>
            <button class="form__submit" >Register</button>
          </form>
      </section-container>
  </div>
</template>

<script>
import SectionContainer from '@/components/reusables/SectionContainer.vue'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'Register',
  components: {
    SectionContainer
  },
  validations: {
    user: {
      email: { required, email, maxLength: maxLength(255) },
      password: { required, minLength: minLength(6), maxLength: maxLength(255) },
      name: { required, maxLength: maxLength(255) }
    }
  },
  data () {
    return {
      user: {
        email: '',
        password: '',
        name: ''
      }
    }
  },
  methods: {
    register () {
      console.log('register user handler')
      this.$v.user.$touch()
      if (this.$v.user.$invalid) {
        // user is invalid
        console.log('invalid input ', this.user)
      } else {
        // user is valid
        console.log('valid input ', this.user)
        console.log('dispatch register user ', this.user)
        this.$store.dispatch('auth/register', { userToRegister: this.user, vm: this })
      }
    }
  }
}
</script>

<style scoped>

.form__title {
  font-size: 1.5rem;
  margin-top: 15px;
}

.form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  grid-gap: 15px;
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
  border-radius:  5px;
  border: none;
  background-color: #124E78;
  color: #F0F0C9;
  outline: none;
  padding: 10px 5px;
  font-size: 1.2rem;
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
