<template>
  <div>
    <button @click="console.log(lineName)">{{ lineName }}</button>
  </div>
</template>

<script>
export default {
  name: "journeyElement",
  props: {
    lineName: {
      type: String,
      required: true,
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
