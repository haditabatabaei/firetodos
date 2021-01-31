<template>
  <section-container>
    <form class="form" @submit.prevent="login">
      <h1 class="form__title">Login with your email</h1>
      <label class="form__label">
        <span class="form__label__name">Email *:</span>
        <input
          class="form__input"
          type="email"
          v-model="$v.user.email.$model"
        />
        <p class="form__label__error" v-if="$v.user.email.$error">
          Please provide a valid email [required].
        </p>
      </label>
      <label class="form__label">
        <span class="form__label__name">Password *:</span>
        <input
          class="form__input"
          type="password"
          v-model="$v.user.password.$model"
        />
        <p class="form__label__error" v-if="$v.user.password.$error">
          Please provide a valid password [At least 6 characters].
        </p>
      </label>
      <button class="form__submit">Login</button>
    </form>
  </section-container>
</template>

<script>
import SectionContainer from '@/components/reusables/SectionContainer.vue'
import {
  required,
  minLength,
  maxLength,
  email
} from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  components: {
    SectionContainer
  },
  validations: {
    user: {
      email: { required, email, maxLength: maxLength(255) },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(255)
      }
    }
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      console.log('login user handler')
      this.$v.user.$touch()
      if (this.$v.user.$invalid) {
        // user is invalid
        console.log('invalid input ', this.user)
      } else {
        // user is valid
        console.log('valid input ', this.user)
        console.log('dispatch login user ', this.user)
        await this.$store.dispatch('auth/login', { userToLogin: this.user, vm: this })
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
  border-radius: 5px;
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
