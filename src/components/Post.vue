<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <p class="text-h4 text--primary">{{ post.title }}</p>
      <div class="text--primary">
        {{ post.body }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="teal accent-4" @click="reveal = true"> Learn More </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'Post',
  props: { post: Object }
};
</script>
<style lang="scss">
</style>