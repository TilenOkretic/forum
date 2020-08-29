<template>
  <section>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand">Forum</a>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li v-if="this.$route.path != '/'" class="nav-item">
            <a class="nav-link" href="#/forum">Home <span class="sr-only">(current)</span></a>
          </li>
          <li v-if="!user" class="nav-item">
            <a class="nav-link" :href="getLoginURL">LOGIN</a>
          </li>
        </ul>
      </div>

      <div v-if="user" class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <span class="navbar-text mr-3">
            <a
            class="nav-link w-50 pl-0 pr-0 pt-0 pb-0 mb-0 mt-0"
            style="border:none;"
            href="#/admin">{{JSON.parse(user).name}}</a>
            <hr class="mb-0 mt-0">
            <p1 class="mb-0 mt-0">Role: {{JSON.parse(user).role_id == 1 ? "ADMINISTRATOR"
          : JSON.parse(user).role_id == 2 ? "USER" : "MODERATOR"}}</p1>
            <hr class="mb-0 mt-0">
            <a class="nav-link w-50 pl-0 pr-0 pt-0 pb-0"
            style="border:none;"
            @click="logout">LOG OUT</a>
          </span>
        </ul>
      </div>
    </nav>
  </section>

</template>

<script>
  import {
    mapState,
  } from 'vuex';

  export default {
    methods: {
      logout() {
        window.localStorage.removeItem('token');
        this.$router.go();
      },
    },
    computed: {
      ...mapState(['user']),
      getLoginURL() {
        if (window.location.hostname === 'localhost') {
          return 'http://localhost:3000/auth/google';
        }
        return 'https://t-forum-serverside.herokuapp.com/auth/google';
      },
    },
  };

</script>
