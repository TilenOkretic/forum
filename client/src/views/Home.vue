/* eslint-disable */

<template>
  <div class="home">
    <div class="jumbotron">
      <h1 class="display-3">Wellcome!</h1>
      <p class="lead">This is a simple forum site!</p>
      <hr class="my-4">
      <p>Still in development!</p>
      <div class="lead p-3 mb-2 text-white">
        <!-- <a v-if="!user"
           class="btn btn-primary btn-lg"
           :href="getLoginURL" role="button">Login with Google</a> -->
        <router-link
          class="btn btn-primary btn-lg"
          to="/forum"
          role="button"> Go to Forum  -›</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */

  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'Home',
    computed: {
      ...mapState(['user']),
      getLoginURL() {
        if (window.location.hostname === 'localhost') {
          return 'http://localhost:3000/auth/google'
        } else {
          return 'https://t-forum-serverside.herokuapp.com/auth/google'
        }
      }
    }
  };

</script>
