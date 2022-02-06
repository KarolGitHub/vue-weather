<template>
  <v-container class="container">
    <WeatherSearch @searchQueryHandler="fetchWeatherData"/>
    <WeatherCard
  /></v-container>
</template>

<script>
import WeatherCard from '../components/WeatherCard.vue';
import WeatherSearch from '../components/WeatherSearch.vue';

export default {
  name: 'Forecast',
  components: { WeatherCard, WeatherSearch },
  data() {},
  methods: {
    fetchWeatherData(search) {
      this.$store.dispatch('fetchWeatherData', search);
    }
  },
  created() {
    this.$store.dispatch('fetchWeatherData', 'rzeszow');
  }
};
</script>

<style>
.container {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: fit-content;
  margin-top: 15%;
}
</style>
