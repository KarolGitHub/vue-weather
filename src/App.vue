<template>
  <v-app>
    <v-container>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    dialog: false
  })
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
</style>
