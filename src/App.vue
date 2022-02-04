<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" app class="sidebar">
      <img class="logo" src="./assets/logo.png" alt="" />
      <v-list-item>
        <router-link to="/" tag="span" style="cursor: pointer"> Home </router-link>
      </v-list-item>
      <v-list-item v-if="isLoggedIn" @click="logout">
        <span style="cursor: pointer">Logout</span>
      </v-list-item>
      <v-list-item v-else>
        <router-link to="/login">Login</router-link>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar app class="nav">
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"> </v-app-bar-nav-icon>
      </span>

      <v-toolbar-items class="hidden-xs-only">
        <img class="logo" src="./assets/logo.png" alt="" />
        <v-list-item>
          <router-link to="/" tag="span"> Home </router-link>
        </v-list-item>
        <v-list-item v-if="isLoggedIn" @click="logout"> <span>Logout</span></v-list-item>
        <v-list-item v-else><router-link to="/login">Login</router-link> </v-list-item>
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

<style lang="scss">
@import './styles/_variables';
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
.sidebar {
  padding: 30px;
  width: 310px;
  min-height: 100vh;
  background-color: $background-2;
  a {
    font-weight: bold;
    color: #fff;
  }
}
</style>
