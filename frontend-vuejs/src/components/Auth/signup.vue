<template>
    <div class="container">
        <div id="signup">
            <div class="signup-form auth-form">
                <form @submit.prevent="onSubmit">
                    <div class="input" :class="{invalid: $v.email.$error}">
                      <label for="email">Email</label>
                      <input
                              type="email"
                              id="email"
                              @blur="$v.email.$touch()"
                              v-model="email">
                        <p v-if="!$v.email.email">Please enter valid email address.</p>
                        <p v-if="!$v.email.required">This field must not be empty.</p>

                    </div>
                    <div class="input" :class="{invalid: $v.password.$error}">
                    <label for="password">Password</label>
                    <input
                            type="password"
                            id="password"
                            @blur="$v.password.$touch()"
                            v-model="password">
                        <p v-if="!$v.password.minLength">Password must be atleast 6 characters</p>
                    </div>
                    <div class="input" :class="{invalid: $v.confirmPassword.$error }">
                    <label for="confirm-password">Confirm Password</label>
                    <input
                            type="password"
                            id="confirm-password"
                            @blur="$v.confirmPassword.$touch()"
                            v-model="confirmPassword">
                    </div>
                    <div class="submit">
                      <button type="submit"
                      :disabled="$v.$invalid" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
 </template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        name: 'Jahid Khan Tuhin'
      }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        sameAs: sameAs('password')
      }
      },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        console.log(formData)
        this.$store.dispatch('signup', formData)
      }
    }
    
  }
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    margin-left: 400px;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 3px 3px 5px 6px #92e9d3;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }
  .input.invalid label {
    color: red
  }
  .input.invalid input {
    border: 1px solid red;
    background-color: rgba(100, 0, 13, 0.37)
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
  .auth-form {
    width: 90%;
    margin: auto;
    padding: 1rem;
    border: 1px solid #10d6a5;
    box-shadow: 3px 3px 5px 6px #92e9d3;
    border-radius: 5px;
  }
  
  @media (min-width: 768px) {
    .auth-form {
      width: 40rem;
    }
  }
</style>