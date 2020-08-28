<template>
  <section>
    <div id="test" class="jumbotron mt-4">
      <h1 class="display-3">{{this.title}}</h1>
      <p class="lead">{{this.description}}</p>
      <hr class="my-4">
      <img style="width: 480px" v-if="this.img_url != ''" :src="this.img_url" />
      <p class="lead">
        <button v-if="user" id="new_topic" @click="showForm($route.params.id, $router, user)"
          class="btn btn-info">Add A New Topic</button>
      </p>
    </div>
    <div @click="edit" v-for="topic of topics" :key="topic.id" :id="topic.id"
      class="card text-white bg-primary mb-3" style="cursor: pointer; max-width: 100%;">
      <div class="card-header">{{topic.title}}</div>
      <div class="card-body">
        <p class="card-text">{{topic.discription}}</p>
      </div>
    </div>
  </section>
</template>

<script>
  /* eslint-disable*/

  import {
    mapState
  } from 'vuex';

  import {
    API_URL
  } from '../API';

  export default {
    data: () => ({
      title: "",
      description: "",
      img_url: "",
      newTopic: {
        title: '',
        discription: '',
      },
      topics: [],
      focus: false
    }),
    methods: {
      edit(data) {
        if (!this.focus) {
          data.srcElement.innerHTML = `
                    <div>
                    <input type="text" id="updateValue" style="background:rgb(255,255,255,0.7); color:black; border: none;" value="${data.srcElement.innerHTML}"> </input> 
                    <button type="submit" id="updateTopic" class="h-50btn btn-success"> EDIT </button>
                    </div>
                    `;
          document.querySelector('#updateTopic').addEventListener('click', async () => {
            let post = null;
            if (data.srcElement.className == 'card-header') {
              const elm_id = data.srcElement.parentElement.id;
              post = await fetch(`${API_URL}/topics/update/${elm_id}`, {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({
                  title: document.querySelector('#updateValue').value
                })
              });
              const res = await post.json();
              data.srcElement.innerHTML = res.title;
              this.focus = false;
            } else if (data.srcElement.className == 'card-text') {
              const elm_id = data.srcElement.parentElement.parentElement.id;
              post = await fetch(`${API_URL}/topics/update/${elm_id}`, {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({
                  discription: document.querySelector('#updateValue').value
                })
              });
              const res = await post.json();
              data.srcElement.innerHTML = res.discription;
              this.focus = false;
            }

          });
          this.focus = true;
        }
      },
      showForm: (id, router, user) => {
        if (document.getElementsByTagName('form').length == 0) {
          document.querySelector('#new_topic').style.display = "none";
          const form = document.createElement('form');
          form.autocomplete = 'off';
          form.id = 'TF';
          form.onsubmit = async (event) => {
            event.preventDefault();

            const respone = await fetch(`${API_URL}/topics`, {
              method: 'POST',
              body: JSON.stringify({
                title: document.querySelector('#title').value,
                discription: document.querySelector('#description').value,
                category_id: id,
                user_id: JSON.parse(user).id
              }),
              headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.token}`,
              },
            });

            document.querySelector('#test').removeChild(document.querySelector('#TF'));
            document.querySelector('#new_topic').style.display = "";

            router.go();

            return respone.json();

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
      // TODO: Refactor code... put code in API.js

      const id = `${this.$route.params.id}`;
      const data = await fetch(`${API_URL}/categories/${id}`);
      const res = await data.json();
      const new_topic = document.querySelector('#new_topic');

      this.title = res.title;
      this.description = res.description;
      this.img_url = res.img_url;
      const user = JSON.parse(this.user);
      if (new_topic) {
        document.querySelector('#new_topic').style.display = user ? "" : "none";
      }
      const topic_data = await fetch(`${API_URL}/topics/${id}`);
      this.topics = await topic_data.json();
    },
    computed: {
      ...mapState(['categories', 'user']),
      currentRouteName() {
        return this.$route.name;
      }
    },
  };

</script>
