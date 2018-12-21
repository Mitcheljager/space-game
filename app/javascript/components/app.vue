<template>
  <div :class="`board pixel-modifier--${ pixelModifier }`" :style="`--pixel-modifier: ${ pixelModifier }`">
    <div class="main-interface">
      <div @click="activeInstance = 'SolarSystem'">Solar System</div>
      <div @click="activeInstance = 'CurrentOrbit'">Orbit</div>
      <div @click="activeInstance = 'Station'">Station</div>
      <div @click="activeInstance = 'StationDetail'">Station Detail</div>
    </div>

    <div class="zoom-interface">
      <div @click="changePixelModifier(-1)">-</div>
      <div @click="changePixelModifier(1)">+</div>
    </div>

    <div v-bind:is="activeInstance" :class="activeInstance" ref="instance"></div>
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
        activeInstance: "SolarSystem",
        pixelModifier: 2
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
        let newPixelModifier = 2

        if (windowWidth > 1100 && windowWidth < 1599) {
          newPixelModifier = 3
        } else if (windowWidth > 1600) {
          newPixelModifier = 4
        }

        if (newPixelModifier != this.pixelModifier) {
          this.pixelModifier = newPixelModifier
          EventBus.$emit("pixelModifierChange")
        }
      },
      changePixelModifier: function(modifier) {
        if (this.pixelModifier + modifier > 1 && this.pixelModifier + modifier < 5) {
          this.pixelModifier += modifier
          this.$el.style["--pixel-modifier"] = this.pixelModifier


          EventBus.$emit("pixelModifierChange")
        }
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

  .zoom-interface {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    font-size: 28px;
    z-index: 10;
    color: white;
    text-shadow: 1px 1px 0 rgba(black, .5), -1px -1px 0 rgba(black, .5), -1px 1px 0 rgba(black, .5), 1px -1px 0 rgba(black, .5);

    div {
      display: block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
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
