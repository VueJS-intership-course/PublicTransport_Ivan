<template>
  <div>
    <div id="map" ref="map" class="map"></div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
  </div>
</template>

<script>
import "ol/ol.css"; // Import OpenLayers CSS
import "ol-popup/src/ol-popup.css"; // Import OpenLayers Popup CSS
import "ol-popup"; // Import the ol-popup library

export default {
  data() {
    return {
      map: null,
      popup: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // Your map initialization code here

      // Create a new map instance
      this.map = new ol.Map({
        target: this.$refs.map,
        // Define your map layers, view, etc.
      });

      // Create a new popup overlay
      this.popup = new ol.Overlay({
        element: document.getElementById("popup"),
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });
      this.map.addOverlay(this.popup);

      // Attach event listeners for feature click and popup close
      this.map.on("click", this.showPopup);
      document.getElementById("popup-closer").onclick = this.hidePopup;
    },
    showPopup(event) {
      // Your code to show the popup here
      // Use event.coordinate to position the popup
      // Populate the popup content as needed
      const popupContent = document.getElementById("popup-content");
      popupContent.innerHTML = "Feature Info: " + "Your feature info here";
      this.popup.setPosition(event.coordinate);
    },
    hidePopup() {
      // Your code to hide the popup here
      this.popup.setPosition(undefined);
    },
  },
};
</script>

<style scoped>
/* Add your CSS styles here for the map and popup */
.map {
  width: 100%;
  height: 400px;
}

/* Add your CSS styles for the popup */
/* Refer to OpenLayers documentation for popup styling options */
</style>
