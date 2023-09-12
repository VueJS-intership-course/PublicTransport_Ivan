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
import GeoJSON from "ol/format/GeoJSON.js";
import Point from "ol/geom/Point.js";
import { toStringHDMS } from "ol/coordinate.js";
import Feature from "ol/Feature.js";
import Polygon from "ol/geom/Polygon.js";

export default {
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({ source: vectorSource });

      const coord = fromLonLat([4.7452703, 52.640007]);
      // const out = toStringHDMS(coord);

      // const feature = new Feature({
      //   geometry: new Point(coord),
      //   name: "My Polygon",
      // });

      // // get the polygon geometry
      // const poly = feature.getGeometry();

      // // Render the feature as a point using the coordinates from labelPoint
      // feature.setGeometryName("labelPoint");

      // // get the point geometry
      // const point = feature.getGeometry();

      const map = new Map({
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([5, 52]),
          zoom: 1,
        }),
        target: "map",
      });

      const feature = new Feature({
        geometry: new Point(coord),
      });

      vectorSource.addFeature(feature);

      map.addLayer(vectorLayer);
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
