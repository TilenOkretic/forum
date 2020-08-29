<template>
  <section class="mt-3">
    <category-list :categories="categories"></category-list>
    <div
    v-if="user && (JSON.parse(user).role_id == 1 || JSON.parse(user).role_id == 3)"
    style="background-color: #32383e !important;
    border: 1px solid rgba(0, 0, 0, 0.6);"
    class="p-3 bg-dark text-white mt-3 mb-3">
        <h3 class="text-monospace text-uppercase">Add Category</h3>
        <form autocomplete="off" @submit.prevent="addCategory(newCategory)">
            <div class="form-group">
                <label for="title" class="text-monospace text-uppercase">Tile</label>
                <input type="text"
                       v-model="newCategory.title"
                       class="form-control" id="title" placeholder="My First Category" required />
            </div>
            <div class="form-group">
                <label for="description" class="text-monospace text-uppercase">Description</label>
                <textarea class="form-control" id="description"
                v-model="newCategory.description"
                placeholder="This is my first category!"
                required rows="5"></textarea>
            </div>
            <div class="form-group">
                <label for="img_url" class="text-monospace text-uppercase">Image URL</label>
                <input type="text"
                v-model="newCategory.img_url"
                class="form-control" id="img_url" placeholder="https://example.com/image.jpg" />
            </div>
            <button id='addNewCategory' type="submit" class="btn btn-success">Add Category</button>
        </form>
    </div>
  </section>
</template>

<script>
  import {
    mapState, mapActions,
  } from 'vuex';

  export default {
    data: () => ({
        newCategory: {
              title: '',
              description: '',
              img_url: '',
        },
    }),
    mounted() {
      console.log('HELLO');
    },
    computed: {
      ...mapState(['user', 'categories']),
    },
    methods: mapActions(['addCategory']),
  };

</script>
