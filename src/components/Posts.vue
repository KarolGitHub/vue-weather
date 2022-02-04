<template >
  <v-container fluid>
    <v-row dense>
      <v-col :key="post.id" v-for="post in posts" class="d-flex">
        <Post :post="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Post from './Post';

export default {
  name: 'Posts',
  props: { posts: Array },
  components: { Post }
};
</script>

<style lang="scss">
</style>