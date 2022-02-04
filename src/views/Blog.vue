<template>
  <div>
    <h1>Blog</h1>
    <Posts :posts="posts" />
  </div>
</template>

<script>
import axios from 'axios';
import Posts from '../components/Posts';

export default {
  name: 'Blog',
  data() {
    return {
      posts: []
    };
  },
  components: { Posts },
  methods: {
    async getPosts() {
      await axios.get('api/posts').then((res) => {
        this.posts = JSON.parse(JSON.stringify(res.data));
      });
    }
  },
  async created() {
    this.getPosts();
  }
};
</script>

<style lang="scss">
</style>