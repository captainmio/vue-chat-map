<template>
  <div>
    <div style="width: 640px; height: 480px" id="mapContainer"></div>
  </div>
</template>

    <script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js" type="text/javascript" charset="utf-8"></script>
<script>
export default {
  name: "hereMap",
  data() {
    return {
      map: {},
      platform: {},
    };
  },
  created() {
    this.platform =  new H.service.Platform({
      'apikey': 'wbx7dfQXyrd2A-9lLz3sel0ZGWtdUUmCOL1lAzrYudo'
    });
  },
  mounted() {
    var defaultLayers = this.platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
        document.getElementById('mapContainer'),
        defaultLayers.vector.normal.map,
        {
          center: {lat:42.35805, lng:-71.0636},
          zoom: 12,
          pixelRatio: window.devicePixelRatio || 1
        });
  },
};
</script>

<style></style>
