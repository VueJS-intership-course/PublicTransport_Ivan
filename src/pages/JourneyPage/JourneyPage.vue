<template>
  <div id="container">
    <div>
      <h2>Lines list</h2>
      <div v-if="entriesCount">
        <JourneyElement
          v-for="(item, key) in pageEntries"
          :key="key"
          :lineName="item"
          @getStops="setStops"
        />
        <ThePaginator :entriesCount="entriesCount" v-model:currentPage="page" />
      </div>
      <div v-else>
        <span>Loading...</span>
      </div>
    </div>
    <MapDrawer :stopsArray="fetchedStops" />
  </div>
</template>

<script>
import fetchJourneys from "@/services/fetchJourneys";
import MapDrawer from "@/components/map/MapDrawer.vue";
import ThePaginator from "@/components/paginator/ThePaginator.vue";
import JourneyElement from "@/components/journey/JourneyElement.vue";

export default {
  components: { MapDrawer, ThePaginator, JourneyElement },
  data: () => {
    return {
      totalEntries: 0,
      page: 1,
      journeys: [],
      entriesPerPage: 10,
      stops: [],
    };
  },
  computed: {
    entriesCount() {
      return this.totalEntries;
    },
    startIndex() {
      return this.page * this.entriesPerPage - this.entriesPerPage;
    },
    endIndex() {
      return this.startIndex + this.entriesPerPage;
    },
    pageEntries() {
      const result = this.journeys.slice(this.startIndex, this.endIndex);
      return result;
    },
    fetchedStops() {
      return this.stops;
    },
  },
  methods: {
    onPageChanged(e) {
      this.page = e;
    },
    setStops(e) {
      this.stops = e.map((stop) => {
        return {
          name: stop.TimingPointName,
          status: stop.TripStopStatus,
          wheelchairAccess: stop.WheelChairAccessible,
          coordinates: { longitude: stop.Longitude, latitude: stop.Latitude },
        };
      });
    },
  },
  async created() {
    const lines = await fetchJourneys();
    this.totalEntries = Object.keys(lines).length;
    this.journeys = Object.keys(lines);
  },
};
</script>

<style scoped>
#container {
  display: flex;
  justify-content: space-between;
  gap: 6rem;
  margin: 1rem 2rem;
}
.loadingH2 {
  font-size: 3.5rem;
  margin: auto;
}
</style>
