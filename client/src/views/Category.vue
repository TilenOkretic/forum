
<template>
  <section>
    <div id="test" class="jumbotron mt-4">
      <h1 class="display-3">{{this.title}}</h1>
      <p class="lead">{{this.description}}</p>
      <hr class="my-4">
      <img style="width: 480px" v-if="this.img_url != ''" :src="this.img_url" />
      <p class="lead">
        <button id="new_topic" @click="showForm" class="btn btn-info">Add A New Topic</button>
      </p>
    </div>
  </section>
</template>

<script>
/* eslint-disable*/

import {
    mapState
  } from 'vuex';
  
  export default {
    data: () => ({
      title: "",
      description: "",
      img_url: ""
    }),
    methods: {
      showForm: () => {
        if (document.getElementsByTagName('form').length == 0) {
          document.querySelector('#new_topic').style.display = "none";
          const form = document.createElement('form');
          form.autocomplete = 'off';
          form.id = 'TF';
          form.onsubmit = (event) => {
            event.preventDefault();
            console.log(document.querySelector('#title').value);
          };
          form.innerHTML = `
          <div id="test" class="jumbotron alert-primary mt-4">
          <h1 class="text-warning text-monospace text-uppercase" style="font-size: 50px">Create A New Topic</h1>
          <div class="form-group">
                <h4 for="title" class="text-light">Tile</h4>
                <input type="text"
                       v-model="newCategory.title"
                       class="form-control" id="title" placeholder="My First Category" required />
            </div>
            <div class="form-group">
                <h4 for="description" class="text-light">Description</h4>
                <textarea class="form-control" id="description"
                v-model="newCategory.description"
                placeholder="This is my first category!"
                required rows="5"></textarea>
            </div>
            <div class="form-group">
                <h4 for="img_url" class="text-light">Image URL</h4>
                <input type="text"
                v-model="newCategory.img_url"
                class="form-control" id="img_url" placeholder="https://example.com/image.jpg" />
            </div>
            <button type="submit" class="btn btn-success">Add Category</button>
            </div>
        `
          document.querySelector('#test').appendChild(form);
        }
      },
    },
    async mounted() {
      const id = `${this.$route.params.id}`;
      const data = await fetch(`http://localhost:3000/api/v1/categories/${id}`);
      const res = await data.json();
      this.title = res.title;
      this.description = res.description;
      this.img_url = res.img_url;
      const user = JSON.parse(this.user);
      document.querySelector('#new_topic').style.display = user ? "" : "none";
    },
    computed: mapState(['categories', 'user']),
  };

</script>
