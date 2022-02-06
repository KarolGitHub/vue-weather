<template>
  <v-container class="container"> <WeatherCard /></v-container>
</template>

<script>
import WeatherCard from '../components/WeatherCard.vue';

export default {
  name: 'Forecast',
  components: { WeatherCard },
  data() {
    return {
      searchQuery: 'rzeszow'
    };
  },
  methods: {},
  created() {
    this.$store.dispatch('fetchWeatherData', this.searchQuery);
  }
};
</script>

<style>
.container {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
