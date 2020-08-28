<template>
  <div>
    <div v-for="category in categories" :key="category.id" class="list-group">
      <a :href="`#/category/${category.id}`"
        class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{category.title}}</h5>
        </div>
        <p class="mb-1">{{category.description}}</p>
      </a>
      <i id="del_button" @click="click"
        v-if="user && (JSON.parse(user).role_id == 1 || JSON.parse(user).role_id == 3)"
        class='ml-1 mt-1 mb-1 material-icons' style="cursor:pointer;" href="">delete</i>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
  } from 'vuex';
  import {
    API_URL,
  } from '../API';

  export default {
    props: ['categories'],
    methods: {
      click() {
        const del = document.getElementsByTagName('i');
        del.forEach(async (elm) => {
          console.log(elm);
          const id = elm.parentElement.children[0].href.split('/')[elm.parentElement.children[0]
            .href.split('/').length - 1];
          const data = await fetch(`${API_URL}/categories/delete/${id}`, {
            method: 'POST',
            headers: {
              authorization: `Bearer ${localStorage.token}`,
            },
          });
          const result = await data.json();
          console.log(result);
          this.$router.go();
        });
      },
    },
    computed: mapState(['user']),
  };

</script>
