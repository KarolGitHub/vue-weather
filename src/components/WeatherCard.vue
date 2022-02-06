<template>
  <v-card class="mx-auto my-auto" max-width="400">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5"> {{ getWeatherData.name }} ({{ getWeatherCountry }}) </v-list-item-title>
        <v-list-item-subtitle>{{ getWeatherData.dateTime }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col class="text-h2" cols="6"> {{ getWeatherData.temp }}&deg;C </v-col>
        <v-col cols="6">
          <v-img :src="weatherImg" alt="weather" width="92"></v-img>
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-message-text</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{ getWeatherData.description }}</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-windsock</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{ getWeatherData.wind }} km/h</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-water-percent</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{ getWeatherData.humidity }}%</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>tape measure</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{ getWeatherData.pressure }}%</v-list-item-subtitle>
    </v-list-item>

    <!-- <v-slider v-model="time" :max="6" :tick-labels="labels" class="mx-4" ticks></v-slider> -->

    <!--  <v-list class="transparent">
      <v-list-item v-for="item in forecast" :key="item.day">
        <v-list-item-title>{{ item.day }}</v-list-item-title>

        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ item.temp }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list> -->
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'WeatherCard',
  computed: {
    ...mapGetters(['getWeatherData', 'getWeatherCountry']),
    weatherImg() {
      const imgObj = {
        Rain: require('../assets/rain.png'),
        Snow: require('../assets/snow.png'),
        Clear: require('../assets/sun.png'),
        Mist: require('../assets/sun.png'),
        Clouds: require('../assets/clouds.png'),
        Haze: require('../assets/clouds.png')
      };
      return imgObj[this.getWeatherData.info];
    }
  },
  methods: {},
  created() {}
};
</script>

<style></style>
