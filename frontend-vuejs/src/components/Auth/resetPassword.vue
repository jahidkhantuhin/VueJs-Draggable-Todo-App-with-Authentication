<template>
    <div class="container">
        <div id="signin">
            <div class="signin-form">
                <form @submit.prevent="onSubmit">
                    <div class="input" :class="{invalid: $v.email.$error}">
                        <label for="email">Email</label>
                        <input
                                type="email"
                                id="email"
                                @blur="$v.email.$touch()"
                                v-model="email">
                        <p v-if="!$v.email.email">Please enter valid email address.</p>
                    </div>
                    <div class="submit">
                        <button type="submit"
                        :disabled= "$v.$invalid">Reset Password</button>
                    </div>
                </form>
            </div>
        </div>  
    </div>
</template>

<script>
import { required, email} from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        email: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email
        }
        this.email= null,
        this.$store.dispatch('resetPassword', formData)
      }
    },
    validations: {
      email: {
        required,
        email
      }
    }
  }
</script>

<style scoped>
  .signin-form {
    width: 90%;
    margin: auto;
    padding: 1rem;
    border: 1px solid #10d6a5;
    box-shadow: 3px 3px 5px 6px #92e9d3;
    border-radius: 5px;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input.invalid label {
    color: red
  }
  .input.invalid input {
    border: 1px solid red;
    background-color: rgba(100, 0, 13, 0.37)
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
  
  @media (min-width: 768px) {
    .signin-form {
      width: 40rem;
    }
  }
</style>