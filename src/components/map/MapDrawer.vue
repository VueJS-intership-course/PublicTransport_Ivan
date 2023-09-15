<template>
  <div class="map-viewer">
    <Mapinitialization @mapLoaded="onLoadMap" />
    <div id="popup" class="ol-popup" ref="popup">
      <a href="#" id="popup-closer" class="ol-popup-closer" @click="hidePopup"></a>
      <p>{{ popupName }}</p>
      <p>{{ popupStatus }}</p>
      <p>{{ popupAccess }}</p>
    </div>
  </div>
</template>

<script>
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Point from "ol/geom/Point.js";
import Feature from "ol/Feature.js";
import { Style, Circle, Fill, Stroke } from "ol/style";
import Icon from "ol/style/Icon";
import Mapinitialization from "./Mapinitialization.vue";
import Overlay from "ol/Overlay.js";

export default {
  name: "mapElement",
  components: { Mapinitialization },
  data: () => {
    return {
      mapInstance: null,
      layer: null,
      pointStyle: new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({
            color: "green",
          }),
          stroke: new Stroke({
            color: "black",
            width: 2,
          }),
        }),
      }),
      pointIconStyle: new Style({
        image: new Icon({
          src: "https://w7.pngwing.com/pngs/595/965/png-transparent-bus-stop-train-station-computer-icons-bus-stop-angle-rectangle-public-transport.png",
          size: [960, 600],
          scale: 0.03,
        }),
      }),
      popupName: null,
      popupStatus: null,
      popupAccess: null,
      clickedStation: null,
      popup: null,
    };
  },
  props: ["stopsArray"],
  watch: {
    stopsArray: function (newVal) {
      this.generateStops(newVal);
    },
  },
  methods: {
    //Set the instance of the created map to the data property of this component
    onLoadMap(emitedMap) {
      this.mapInstance = emitedMap;

      this.popup = new Overlay({
        element: this.$refs.popup,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
      });

      this.mapInstance.addOverlay(this.popup);
    },
    generateStops(stops) {
      // Clear layers before new ones
      if (this.layer) {
        this.mapInstance.removeLayer(this.layer);
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
        feature.setProperties({
          name: stop.name,
          status: stop.status,
          wheelchairAccess: stop.wheelchairAccess,
          coordinates: coord,
        });
        feature.setStyle(this.pointIconStyle);

        vectorSource.addFeature(feature);
      });
      //Add the layer to the map
      this.mapInstance.addLayer(this.layer);

      //Hook the map click event
      this.mapClickHandler();
    },
    mapClickHandler() {
      //Set the map click event

      this.mapInstance.on("click", (evt) => {
        const features = this.mapInstance.forEachFeatureAtPixel(
          evt.pixel,
          (feature) => feature
        );
        if (features) {
          this.clickedStation = features.getProperties();

          this.showPopup();
        } else {
          this.hidePopup();
        }
      });
    },
    showPopup() {
      this.popupName = `Name: ${this.clickedStation.name}`;
      this.popupStatus = `Status: ${this.clickedStation.status}`;
      this.popupAccess = `WheelChair: ${this.clickedStation.wheelchairAccess}`;

      this.popup.setPosition(this.clickedStation.coordinates);
    },
    hidePopup() {
      this.popup.setPosition(undefined);

      this.clickedStation = null;
      this.popupName = null;
      this.popupStatus = null;
      this.popupAccess = null;
    },
  },
};
</script>
<style scoped>
.map-viewer {
  width: 100%;
  margin-top: 1rem;
}
.map {
  height: 40rem;
}

.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
</style>
