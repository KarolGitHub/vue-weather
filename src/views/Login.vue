<template>
  <v-container class="flex justify-center align-center">
    <img class="logo" src="../assets/logo.png" alt="" />

    <v-form>
      <v-container>
        <v-col>
          <v-col class="ma-auto" cols="9" sm="6" md="3">
            <v-text-field placeholder="Enter Name" />
          </v-col>

          <v-col class="ma-auto" cols="9" sm="6" md="3">
            <v-text-field placeholder="Enter Email" />
          </v-col>

          <v-col class="ma-auto" cols="9" sm="6" md="3">
            <v-text-field type="password" placeholder="Enter Password" />
          </v-col>

          <v-col class="ma-auto" cols="9" sm="6" md="3">
            <v-btn block color="primary" v-on:click="signUp">Sign up</v-btn>
          </v-col>
        </v-col>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async signUp() {
      const res = await axios('api/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password
        })
      });

      if (res.status == 201) {
        localStorage.setItem('user-info', JSON.stringify(res.data));
        this.$router.push({ name: 'Home' });
      }
    }
  },
  mounted() {
    let user = localStorage.getItem('user-info');
    if (user) {
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style>
.logo {
  width: 100px;
}
</style>
