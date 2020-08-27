<template>
  <section>
    <h1>Admin View!</h1>
    <category-list :categories="categories"></category-list>
    <div class="mt-4">
        <h3>Add Category</h3>
        <form autocomplete="off" @submit.prevent="addCategory(newCategory)">
            <div class="form-group">
                <label for="title">Tile</label>
                <input type="text"
                       v-model="newCategory.title"
                       class="form-control" id="title" placeholder="My First Category" required />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" id="description"
                v-model="newCategory.description"
                placeholder="This is my first category!"
                required rows="5"></textarea>
            </div>
            <div class="form-group">
                <label for="img_url">Image URL</label>
                <input type="text"
                v-model="newCategory.img_url"
                class="form-control" id="img_url" placeholder="https://example.com/image.jpg" />
            </div>
            <button type="submit" class="btn btn-success">Add Category</button>
        </form>
    </div>
  </section>
</template>
<script>
  import {
    mapState,
    mapActions,
  } from 'vuex';

  export default {
    data: () => ({
        newCategory: {
              title: '',
              description: '',
              img_url: '',
        },
    }),
    async mounted() {
      const admin = this.isAdmin();
      if (!admin) {
        this.$router.push('/forum');
      }
    },
    computed: mapState(['categories']),
    methods: mapActions(['isAdmin', 'addCategory']),
  };

</script>
