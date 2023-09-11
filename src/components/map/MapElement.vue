<template>
  <div class="map-viewer"><div id="map" class="map"></div></div>
</template>
<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export default {
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      new Map({
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([5, 52]),
          zoom: 8,
        }),
        target: "map",
      });
    },
  },
};
</script>
<style scoped>
.map-viewer {
  width: 66%;
  margin-top: 1rem;
}
.map {
  height: 40rem;
}
</style>
