<template>
  <div class="board">
    <div class="main-interface">
      <div @click="activeInstance = 'currentOrbit'">Orbit</div>
      <div @click="activeInstance = 'station'">Station</div>
    </div>

    <Station v-if="activeInstance == 'station'"></Station>
    <StationDetail v-if="activeInstance == 'stationDetail'"></StationDetail>
    <CurrentOrbit v-if="activeInstance == 'currentOrbit'"></CurrentOrbit>
  </div>
</template>

<script>
  import Station from "components/instances/station"
  import StationDetail from "components/instances/station_detail"
  import CurrentOrbit from "components/instances/current_orbit"

  export default {
    components: {
      Station,
      StationDetail,
      CurrentOrbit
    },
    data: function () {
      return {
        activeInstance: "currentOrbit"
      }
    }
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  .board {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    user-select: none;
    font-family: sans-serif;
  }

  .main-interface {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
  }
</style>
