<template>
  <div>
    <router-link
      :to="{ name: 'journey', params: { journeyId: lineName } }"
      :class="{ selected: lineName === '$route.params' }"
    >
      {{ lineName }}
    </router-link>
  </div>
</template>

<script>
import fetchStops from "@/services/fetchStops";

export default {
  name: "JourneyElement",
  emits: ["get-stops"],
  props: {
    lineName: {
      type: String,
      required: true,
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
        alert("Invalid line , please select another.");
      }
    },
  },
};
</script>

<style scoped>
a {
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: white;
  border: 2px solid #ccc;
  margin: 0.5rem auto;
  cursor: pointer;
  text-decoration: none;
  color: black;
}

.router-link-exact-active {
  background-color: #ccc;
}
</style>
