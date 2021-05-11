<template>
    <div class="container">
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand black-text todo" href="#">TODO APP</a>
                </div>
                <ul class="nav navbar-nav navbar-right">
                    <router-link to="/"><a class="navbar-brand black-text" href="#" v-if="auth"> Home</a></router-link>

                    <router-link v-if="!auth" to="/signup" tag="li"><a href="#">
                        <span class="glyphicon glyphicon-user black-text"></span> Signup</a>
                    </router-link>
                    <router-link v-if="!auth" to="/signin" tag="li"><a href="#">
                        <span class="glyphicon glyphicon-log-in black-text"></span> Login</a>
                    </router-link>
                    <router-link v-if="auth" to="/signin" tag="li">
                        <button @click="onLogout" class="logout"> Logout</button>
                    </router-link>
                </ul>

            </div>
        </nav>
    </div>
</template>

<script>
export default {
    computed: {
        auth() {
            return this.$store.getters.isAuthenticated
        }
    },
    methods: {
        onLogout() {
            this.$store.dispatch('logOut')
        }
    }
}
</script>

<style scoped>
.navbar{
    background-color: #10d6a5;
}
.logout {
    background-color: transparent;
    border: none;
    font: inherit;
    font-weight: bold;
    font-size: 18px;
    margin-top: 12px;
    margin-right: 10px;
    color: black;
    cursor: pointer;
  }
  .logout:hover {
    color: white;
    cursor: pointer;
  }
  .black-text{
      color: black;
  }
  .todo{
      font-size: 20px; 
      font-weight: bold;
  }
</style>