<template>
  <div id="container">
    <div>
      <p>Stations</p>
    </div>
    <MapElement />
  </div>
</template>

<script>
import fetchJourneys from "./services/fetchData";
import MapElement from "./components/map/MapElement.vue";

export default {
  components: { MapElement },
  async created() {
    const lines = await fetchJourneys();
    console.log(lines);
  },
};
</script>

<style scoped>
#container {
  display: flex;
  justify-content: space-between;
}
</style>
