<template>
  <v-container class="flex justify-center align-center">
    <img class="logo" src="../assets/logo.png" alt="" />
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
  methods: {},
  mounted() {
    let user = localStorage.getItem('user-info');
    if (!user) {
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style></style>
