<template>
  <div class="board" :style="`--pixel-modifier: ${ pixelModifier }`">
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
  import { EventBus } from "components/event_bus"
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
        activeInstance: "StationDetail",
        pixelModifier: 1
      }
    },
    mounted() {
      window.addEventListener("resize", this.setPixelModifier)

      this.setPixelModifier()
    },
    methods: {
      setPixelModifier: function() {
        const element = this.$el
        let windowWidth = document.documentElement.clientWidth

        if (windowWidth < 1099) {
          this.pixelModifier = 2
        } else if (windowWidth > 1100 && windowWidth < 1599) {
          this.pixelModifier = 3
        } else if (windowWidth > 1600) {
          this.pixelModifier = 4
        }
        
        EventBus.$emit("pixelModifierChange")
      }
    }
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  html,
  body {
    --pixel-modifier: 3;
    margin: 0;
    overflow: hidden;
  }

  .board {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    user-select: none;
    font-family: "VT323", monospace;
    font-size: 18px;
  }

  .main-interface {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    color: white;
    text-shadow: 1px 1px 0 rgba(black, .5), -1px -1px 0 rgba(black, .5), -1px 1px 0 rgba(black, .5), 1px -1px 0 rgba(black, .5);
  }

  .temp-interface {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    color: white;
    text-shadow: 1px 1px 0 rgba(black, .5), -1px -1px 0 rgba(black, .5), -1px 1px 0 rgba(black, .5), 1px -1px 0 rgba(black, .5);
  }

  .table-column {
    display: flex;
    justify-content: space-between;
  }

  .text-light {
    color: rgba(white, .5);
  }
</style>
