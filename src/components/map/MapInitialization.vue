<template>
  <div ref="map" class="map"></div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

export default {
  name: "MapInitilization",
  emits: ["map-loaded"],
  data: () => {
    return {
      map: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new Map({
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([5, 52]),
          zoom: 8,
        }),
        target: this.$refs.map,
      });

      this.map.on("rendercomplete", this.emitMap);
    },
    emitMap() {
      this.$emit("map-loaded", this.map);
    },
  },
};
</script>

<style scoped>
.map {
  height: 40rem;
}
</style>
