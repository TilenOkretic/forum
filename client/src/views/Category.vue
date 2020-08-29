<template>
  <section>
    <div id="test" class="jumbotron pt-1 pb-1 mt-4">
      <h1 class="display-3">{{this.title}}</h1>
      <p class="lead">{{this.description}}</p>
      <hr class="my-4">
      <img style="width: 480px" v-if="this.img_url != ''" :src="this.img_url" />
      <p class="lead">
        <button v-if="user" id="new_topic" @click="showForm($route.params.id, $router, user)"
          class="btn btn-info">Add A New Topic</button>
      </p>
    </div>
    <div v-for="topic of topics" :key="topic.id" :id="topic.id"
      class="card text-white bg-primary mb-3" style="cursor: pointer; max-width: 100%;">
      <div class="card-header">
        <div v-if="user && (JSON.parse(user).role_id == 1 || JSON.parse(user).id == topic.user_id)"
          class="text-right">
          <button @click="edit" type="button" class="btn-md btn-success">EDIT</button>
          <i id="del_button" @click="removeTopic"
            class='material-icons'
            style="font-size: 30px; cursor:pointer; transform: translate(0,7px);"
            href="">delete</i>
        </div>
        <h3 :id="'title' + topic.id">{{topic.title}}</h3>
      </div>
      <div class="card-body">
        <p class="card-text" :id="'description' + topic.id">{{topic.discription}}</p>
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
      focus: ''
    }),
    methods: {
      async removeTopic(data){
          const topic_id = data.srcElement.parentElement.parentElement.parentElement.id;
          const post = await fetch(`${API_URL}/topics/delete/${topic_id}`,{
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.token}`,
            }
          });
          const res = await post.json();
          console.log(res);
          this.$router.go();
      },
      async edit(data) {
        const main_id = data.srcElement.parentElement.parentElement.parentElement.id;
        const title = document.querySelector(`#title${main_id}`);
        const description = document.querySelector(`#description${main_id}`);
        if (this.focus == '') {
          title.innerHTML = `
                    <div>
                    <input type="text" id="updateTitle" style="background:rgb(255,255,255,0.7); color:black; border: none;" value="${title.innerHTML}"> </input> 
                    </div>
                    `;

          description.innerHTML = `
                    <div>
                    <input type="text" id="updateDescription" style="background:rgb(255,255,255,0.7); color:black; border: none;" value="${description.innerHTML}"> </input> 
                    </div>
                    `;
          data.srcElement.innerHTML = "update";
          this.focus = main_id;
        } else if (this.focus == main_id){
          const title_edit = document.querySelector('#updateTitle');
          const description_edit = document.querySelector('#updateDescription');

          const id = data.srcElement.parentElement.parentElement.parentElement.id;
          const post = await fetch(`${API_URL}/topics/update/${id}`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              title: title_edit.value,
              discription: description_edit.value,
            }),
          });

          const respone = await post.json();
          console.log(respone);


          title.innerHTML = title_edit.value;
          description.innerHTML = description_edit.value;

          data.srcElement.innerHTML = "edit";
          this.focus = '';
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
          };
          form.innerHTML = `
          <div id="test" class="jumbotron alert-primary mt-4">
          <h1 class="text-warning text-monospace text-uppercase" style="font-size: 50px">Create A New Topic</h1>
          <div class="form-group">
                <h4 for="title" class="text-monospace text-light">Title</h4>
                <input type="text"
                       class="form-control" id="title" placeholder="My First Topic" required />
            </div>
            <div class="form-group">
                <h4 for="description" class="text-monospace text-light">Topic Description</h4>
                <textarea class="form-control" id="description"
                placeholder="This is my first topic!"
                required rows="5"></textarea>
            </div>
            <button type="submit" class="btn btn-warning">Add Topic</button>
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
    computed: mapState(['categories', 'user']),
  };

</script>
