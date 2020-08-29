/* eslint-disable */

<template>
  <div id="app">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <app-nav></app-nav>
    <router-view class="container" />
  </div>
</template>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

<script>
  import { mapActions } from 'vuex';
  import AppNav from '@/components/AppNav.vue';

  export default {
    components: {
      AppNav,
    },
    mounted() {
      this.login(localStorage.token);
      this.loadCategories();
    },
    methods: mapActions(['login', 'loadCategories']),
  };

</script>

<style lang="scss">
</style>
