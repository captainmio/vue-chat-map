<template>
  <div class="here-map">
    <div
      id="Heremap"
      ref="map"
      style="width: 100%; min-height: 800px; height: 100%;"
    ></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

export default {
  name: "HereMap",
  data() {
    return {
      platform: {},
      map: {},
    };
  },
  methods: {
    addLatLng(coordinates) {
      this.$store.dispatch("setMapCoordinates", {
        lat: coordinates.lat,
        lng: coordinates.lng,
      });
    },
  },
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoidml6ZHVtbXkyMSIsImEiOiJja2JxbHhoaHIybTNyMnNrMHFzNDBwbWVjIn0.B275Uzvl2fKgKaVqb2adhQ";

    const map = new mapboxgl.Map({
      container: "Heremap",
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [0, 0],
      zoom: 1.5, // starting zoom
    });

    var marker = new mapboxgl.Marker({
      // draggable: true
      anchor: "center",
      pitchAlignment: "viewport",
    })
      .setLngLat([0, 0])
      .addTo(map);

    var self = this;

    // events to stay put the marker on the center of the map
    map.on("movestart", function() {
      marker.setLngLat(map.getCenter());
    });

    map.on("move", function() {
      marker.setLngLat(map.getCenter());
    });

    map.on("moveend", function() {
      let coor = marker.setLngLat(map.getCenter());

      // set coordinate and save it to the store
      self.addLatLng(coor.getLngLat());
    });
  },
};
</script>

<style scoped></style>
