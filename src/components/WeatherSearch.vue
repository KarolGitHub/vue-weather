<template>
  <v-text-field
    type="text"
    placeholder="Search City"
    class="search-control"
    v-model.trim="search"
    @keydown.enter="searchQueryHandler"
    solo
  />
</template>

<script>
export default {
  name: 'WeatherSearch',
  data() {
    return {
      search: ''
    };
  },

  methods: {
    searchQueryHandler() {
      this.$emit('searchQueryHandler', this.search);
    }
  }
};
</script>
