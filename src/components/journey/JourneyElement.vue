<template>
  <div>
    <button @click="getStops(lineName)">{{ lineName }}</button>
  </div>
</template>

<script>
import fetchStops from "../../services/fetchStops";

export default {
  name: "journeyElement",
  emits: ["get-stops"],
  props: {
    lineName: {
      type: String,
      required: true,
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
button {
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: white;
  border: 2px solid #ccc;
  margin: 0.5rem auto;
  cursor: pointer;
}
</style>
