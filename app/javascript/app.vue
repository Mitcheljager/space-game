<template>
  <div class="board">
    <Station v-if="activeInstance == 'station'"></Station>
    <StationDetail v-if="activeInstance == 'stationDetail'"></StationDetail>
  </div>
</template>

<script>
  import Station from "components/instances/station"
  import StationDetail from "components/instances/station_detail"

  export default {
    components: {
      Station,
      StationDetail
    },
    data: function () {
      return {
        activeInstance: "station"
      }
    }
  }
</script>

<style>
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
</style>
