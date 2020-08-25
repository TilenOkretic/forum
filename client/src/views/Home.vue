/* eslint-disable */

<template>
  <div class="home">
    <div class="jumbotron">
      <h1 class="display-3">Wllcome!</h1>
      <p class="lead">This is a simple forum site!</p>
      <hr class="my-4">
      <p>Still in development!</p>
      <p class="lead">
        <a class="btn btn-primary btn-lg" :href="getLoginURL" role="button">Login with Google</a>
      </p>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'Home',
    computed: {
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
