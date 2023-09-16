<template>
  <div>
    <router-link
      :to="{ name: 'journeys', params: { journeyId: lineName } }"
      :class="{ selected: lineName === '$route.params' }"
    >
      {{ lineName }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "JourneyItem",
  props: {
    lineName: {
      type: String,
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
