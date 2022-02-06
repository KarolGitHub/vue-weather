import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: null,
    status: '',
    authToken: localStorage.getItem('auth-token') || '',
    user: {},
    apiKey: '5d1b6b9deab390416a61a29633203a86',
    weatherData: {}
  },
  getters: {
    isLoggedIn: (state) => !!state.authToken,
    authStatus: (state) => state.status,
    getWeatherData: (state) => state.weatherData,
    getWeatherCountry(state) {
      return state.weatherData.country;
    }
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
    },
    setWeatherData(state, data) {
      state.weatherData = data;
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
    },
    async fetchWeatherData({ commit, state }, search) {
      const apiBase = 'https://api.openweathermap.org/data/2.5/';
      try {
        commit('setWeatherData', search);
        const res = await axios.get(`${apiBase}weather?q=${search}&units=metric&APPID=${state.apiKey}`);
        const newWeatherData = {
          name: res.data.name,
          temp: Math.round(res.data.main.temp),
          feelsLike: res.data.main.feels_like,
          pressure: res.data.main.pressure,
          description: res.data.weather[0].description,
          icon: res.data.weather[0].icon.substring(0, 2),
          info: res.data.weather[0].main,
          wind: res.data.wind.speed,
          humidity: res.data.main.humidity,
          clouds: res.data.clouds.all,
          dateTime: new Date(res.data.dt * 1000 + res.data.timezone * 1000).toString().split('(')[0],
          country: res.data.sys.country
        };
        commit('setWeatherData', newWeatherData);
      } catch (error) {
        console.log(error);
        commit('setWeatherData', {});
      }
    }
  }
});
