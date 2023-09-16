<template>
  <div>
    <JourneyItem v-for="(item, key) in pageEntries" :key="key" :lineName="item" />
  </div>
</template>

<script>
import fetchStops from "@/services/fetchStops";
import JourneyItem from "@/components/journey/JourneyItem.vue";

export default {
  name: "JourneyElement",
  components: { JourneyItem },
  emits: ["get-stops"],
  props: {
    pageEntries: {
      type: Array,
    },
  },
  watch: {
    "$route.params": {
      immediate: true,
      handler(newVal) {
        if (newVal.journeyId) {
          this.getStops(newVal.journeyId);
        }
      },
    },
  },
  methods: {
    async getStops(id) {
      try {
        const response = await fetchStops(id);
        const stops = Object.values(response[id].Stops);
        this.$emit("get-stops", stops);
      } catch (error) {
        this.$router.push("/journeys");
        alert("Invalid line , please select another.");
      }
    },
  },
};
</script>
