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
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Point from "ol/geom/Point.js";
import Feature from "ol/Feature.js";

export default {
  name: "mapElement",
  data: () => {
    return {
      map: null,
      layer: null,
    };
  },
  props: ["stopsArray"],
  watch: {
    stopsArray: function (newVal) {
      this.generateStops(newVal);
    },
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
        target: "map",
      });

      // TODO: When map is initialised , wouldn't be good to emit an event to the parent element and return the instance of the map
    },
    generateStops(stops) {
      // Clear layers before new ones
      if (this.layer) {
        this.map.removeLayer(this.layer);
      }

      //Create new layer
      const vectorSource = new VectorSource();
      this.layer = new VectorLayer({ source: vectorSource });

      //Go through all stops and generate a point for each one
      stops.forEach((stop) => {
        const coord = fromLonLat([stop.coordinates.longitude, stop.coordinates.latitude]);

        const feature = new Feature({
          geometry: new Point(coord),
        });

        vectorSource.addFeature(feature);
      });

      //Add the layer to the map
      this.map.addLayer(this.layer);
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
