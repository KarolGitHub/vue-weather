<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" app>
      <img class="logo" src="./assets/logo.png" alt="" />
      <router-link to="/" tag="span" style="cursor: pointer"> Home </router-link>
      <span v-if="isLoggedIn" @click="logout" style="cursor: pointer">Logout</span>
      <router-link v-else to="/login">Login</router-link>
    </v-navigation-drawer>

    <v-app-bar app>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"> </v-app-bar-nav-icon>
      </span>
      <img class="logo" src="./assets/logo.png" alt="" />
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer"> Home </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <span v-if="isLoggedIn" @click="logout" style="cursor: pointer">Logout</span>
        <router-link v-else to="/login">Login</router-link>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view> </router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    sidebar: false
  }),
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login');
      });
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(this.logout);
        }
        throw err;
      });
    });
  }
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
.logo {
  width: 50px;
}
</style>
