import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: null,
    status: '',
    authToken: localStorage.getItem('auth-token') || '',
    user: {}
  },
  mutations: {
    authRequest(state) {
      state.status = 'loading';
    },
    authSuccess(state, payload) {
      state.status = 'success';
      state.authToken = payload.authToken;
      state.user = payload.user;
    },
    authError(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.authToken = '';
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('authRequest');
        axios({
          url: `api/users?email=${user.email}&password=${user.password}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
        })
          .then((res) => {
            if (res.data.length) {
              const authToken = res.data.id;
              const user = res.data;
              localStorage.setItem('auth-token', authToken);
              axios.defaults.headers.common['Authorization'] = authToken;
              commit('authSuccess', { authToken: authToken, user: user });
              resolve(res);
            }
            reject(new Error('wrong login email or password'));
          })
          .catch((err) => {
            commit('authError');
            localStorage.removeItem('authToken');
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('authRequest');
        axios({ url: 'api/users', data: user, method: 'POST' })
          .then((res) => {
            const authToken = res.data.id;
            const user = res.data;
            localStorage.setItem('auth-token', authToken);
            axios.defaults.headers.common['Authorization'] = authToken;
            commit('authSuccess', { authToken, user });
            resolve(res);
          })
          .catch((err) => {
            commit('authError', err);
            localStorage.removeItem('auth-token');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('auth-token');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.authToken,
    authStatus: (state) => state.status
  }
});
