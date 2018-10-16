<template>
  <div class="board">
    <div class="main-interface">
      <div @click="activeInstance = 'SolarSystem'">Solar System</div>
      <div @click="activeInstance = 'CurrentOrbit'">Orbit</div>
      <div @click="activeInstance = 'Station'">Station</div>
    </div>

    <Station v-if="activeInstance == 'Station'"></Station>
    <StationDetail v-if="activeInstance == 'StationDetail'"></StationDetail>
    <CurrentOrbit v-if="activeInstance == 'CurrentOrbit'"></CurrentOrbit>
    <SolarSystem v-if="activeInstance == 'SolarSystem'"></SolarSystem>
  </div>
</template>

<script>
  import Station from "components/instances/station"
  import StationDetail from "components/instances/station_detail"
  import CurrentOrbit from "components/instances/current_orbit"
  import SolarSystem from "components/instances/solar_system"

  export default {
    components: {
      Station,
      StationDetail,
      CurrentOrbit,
      SolarSystem
    },
    data: function () {
      return {
        activeInstance: "SolarSystem"
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
