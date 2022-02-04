<template>
  <v-container class="flex justify-center align-center">
    <h1>Home Page</h1>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {};
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {}
};
</script>

<style></style>
