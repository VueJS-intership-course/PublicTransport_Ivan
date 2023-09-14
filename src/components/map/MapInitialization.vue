<template>
  <div ref="map" class="map"></div>
  <!-- <div id="popup" ref="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"></div>
  </div> -->
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Overlay from "ol/Overlay.js";

export default {
  name: "MapInitilization",
  emits: ["map-loaded"],
  data: () => {
    return {
      map: null,
      popup: null,
      popupContent: null,
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

      //   this.popup = new Overlay({
      //     element: this.$refs.popup,
      //     positioning: "top-center",
      //     offset: [0, -10],
      //   });

      //   this.map.addOverlay(this.popup);

      //   this.map.on("click", this.showPopup);
      //   document.getElementById("popup-closer").onclick = this.hidePopup;

      this.map.on("rendercomplete", this.emitMap);
    },
    emitMap() {
      this.$emit("map-loaded", this.map);
    },
    // showPopup(event) {
    //   this.popupContent = "testst";
    //   this.popup.setPosition(event.coordinate);
    // },
    // hidePopup() {
    //   this.popup.setPosition(undefined);
    // },
  },
};
</script>

<style scoped>
.map {
  height: 40rem;
}
</style>
