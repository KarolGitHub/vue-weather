<template>
  <v-container class="flex justify-center align-center">
    <v-form @submit.prevent="register">
      <v-container>
        <v-col>
          <v-col class="ma-auto" cols="9" sm="6" md="3">
            <v-text-field v-model="name" placeholder="Enter Name" :rules="nameRules" />
          </v-col>

          <v-col class="ma-auto" cols="9" sm="6" md="3">
            <v-text-field type="email" v-model="email" placeholder="Enter Email" :rules="emailRules" />
          </v-col>

          <v-col class="ma-auto" cols="9" sm="6" md="3">
            <v-text-field type="password" v-model="password" placeholder="Enter Password" :rules="passwordRules" />
          </v-col>

          <v-col class="ma-auto" cols="9" sm="6" md="3">
            <v-text-field
              type="password"
              v-model="confirmPassword"
              placeholder="Confirm Password"
              :rules="passwordRules"
            />
          </v-col>

          <v-col class="ma-auto" cols="9" sm="6" md="3">
            <v-btn block color="primary" type="submit">Register</v-btn>
          </v-col>
        </v-col>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { nameRules, emailRules, passwordRules } from '../utils';

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameRules: nameRules,
      emailRules: emailRules,
      passwordRules: passwordRules
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch('register', { name: this.name, email: this.email, password: this.password })
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err));
    }
  }
};
</script>

<style>
</style>
