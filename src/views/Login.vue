<template>
  <v-container class="flex justify-center align-center">
    <v-form v-model="isValid" @submit.prevent="login">
      <v-container>
        <v-col>
          <v-col class="ma-auto" cols="9" sm="6" md="3">
            <v-text-field type="email" v-model="email" placeholder="Enter Email" :rules="emptyRule" />
          </v-col>

          <v-col class="ma-auto" cols="9" sm="6" md="3">
            <v-text-field type="password" v-model="password" placeholder="Enter Password" :rules="emptyRule" />
          </v-col>

          <v-col class="ma-auto" cols="9" sm="6" md="3">
            <v-btn block color="primary" type="submit" :disabled="!isValid">Login</v-btn>
          </v-col>
        </v-col>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { emptyRule } from '../utils';

export default {
  data() {
    return {
      email: '',
      password: '',
      isValid: true,
      emptyRule: emptyRule
    };
  },
  methods: {
    login: function () {
      let email = this.email;
      let password = this.password;

      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err));
    }
  }
};
</script>