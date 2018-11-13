<template>
  <Instance class="instance--solar-sytem" :backgrounds="[{ name: 'solar-sytem-stars', speed: 0, backgroundSpeed: 5 }]">
    <div class="temp-interface" slot="interface">
      <div @click="showRevolution = !showRevolution">Show Revolution {{ showRevolution }}</div>
      <div @click="showCurrentRevolution = !showCurrentRevolution">Show Current Revolution {{ showCurrentRevolution }}</div>
    </div>

    <div class="solar-system" :style="wrapperStyle()">
      <main class="solar-system__primary" :style="primaryStyle()"></main>

      <aside v-for="(planet, index) in solarSystemData"
        :style="styleObject(planet, index)"
        class="solar-system__orbital"
        :ref="`planet--${ planet.id }`">

        <div class="solar-system__orbital-trigger" @click="toggleFloatingMenu(planet)"></div>

        <FloatingMenu :ref="`floating_menu--${ planet.id }`">
          <div class="table-column">
            <span class="text-light">Distance from Sun:</span>&nbsp;{{ planet.distance }}au
          </div>

          <div class="table-column">
            <span class="text-light">Diameter:</span>&nbsp;{{ planet.size }}km
          </div>

          <Button @click.native="openOrbit('CurrentOrbit', planet)">Show Orbit</Button>
        </FloatingMenu>
      </aside>
    </div>
  </Instance>
</template>

<script>
  import Instance from "../instance"
  import FloatingMenu from "../interface/floating_menu"
  import Button from "../interface/button"

  export default {
    components: {
      Instance,
      FloatingMenu,
      Button
    },
    data: function () {
      return {
        sizeMeasurement: "km",
        distanceMeasurement: "au",
        revolutionMeasurements: "Earth Days",
        showRevolution: false,
        showCurrentRevolution: false,
        planetSizeModifier: 100,
        planetDistanceModifier: 500,
        star: { name: "Sun", size: 1392000, color: "yellow" },
        solarSystemData: [
          { id: 1, name: "Mercury", size: 4879, distance: 0.39, revolution: 87.98, starting_revolution: 95, color: "grey" },
          { id: 2, name: "Venus", size: 12104, distance: 0.723, revolution: 224.68, starting_revolution: 10, color: "orange" },
          { id: 3, name: "Earth", size: 12756, distance: 1, revolution: 365.26, starting_revolution: 0, color: "blue" },
          { id: 4, name: "Mars", size: 6794, distance: 1.525, revolution: 686.98, starting_revolution: 30, color: "red" },
          { id: 5, name: "Jupiter", size: 142980, distance: 5.203, revolution: 4329.63, starting_revolution: 120, color: "lightgrey" },
          { id: 6, name: "Saturn", size: 120540, distance: 9.539, revolution: 10386.44, starting_revolution: 95, color: "gold" },
          { id: 7, name: "Uranus", size: 51120, distance: 19.18, revolution: 30685.55, starting_revolution: -30, color: "aqua" },
          { id: 8, name: "Neptune", size: 49530, distance: 30.06, revolution: 60155.65, starting_revolution: 45, color: "darkblue" },
          { id: 9, name: "Pluto", size: 1188, distance: 39.53, revolution: 90410.5, starting_revolution: 80, color: "brown" }
        ]
      }
    },
    methods: {
      openOrbit: function(target, targetData) {
        this.$root.$children[0].$data.activeInstance = target

        this.$nextTick(function() {
          this.$root.$children[0].$children[0]._data.primaryData = targetData
        })
      },
      styleObject: function(planet, index) {
        let previousPlanet = { size: 0 }
        if (this.solarSystemData[index - 1])
          previousPlanet = this.solarSystemData[index - 1]

        let distance = (this.star.size / this.planetSizeModifier / 2) + (planet.distance * this.planetDistanceModifier) + (previousPlanet.size / this.planetSizeModifier)
        let size = planet.size / this.planetSizeModifier

        let revolutionTime = 0
        if (this.showRevolution)
          revolutionTime = 360 * (planet.revolution / 365.26) / 1000

        this.$nextTick(function() {
          const self = this
          const element = self.$el

          let degree = 0
          if (this.showCurrentRevolution)
            degree = planet.starting_revolution

          element.style.setProperty(`--rotation-${ planet.id }`, `${ degree }deg`)

          let setRotation = ""

          if (this.showRevolution) {
            setRotation = setInterval(function() {
              if (document.hasFocus()) {
                degree = degree - 1
                element.style.setProperty(`--rotation-${ planet.id }`, `${ degree }deg`)
              }
            }, revolutionTime * 1000)
          } else {
            clearInterval(setRotation)
          }
        })

        return {
          width: size + "px",
          height: size + "px",
          top: `-${ size / 2 }px`,
          left: `-${ size / 2 }px`,
          background: planet.color,
          transform: `translateX(${ distance }px) rotate(var(--rotation-${ planet.id }))`,
          transformOrigin: `-${ distance }px center`,
          transitionDuration: revolutionTime + "s"
        }
      },
      primaryStyle: function() {
        return {
          width: (this.star.size / this.planetSizeModifier) + "px",
          height: (this.star.size / this.planetSizeModifier) + "px",
          background: this.star.color
        }
      },
      wrapperStyle: function() {
        let offset = (this.star.size / this.planetSizeModifier) / 2

        return {
          transform: `translateX(-${ offset }px)`
        }
      },
      toggleFloatingMenu: function(planet) {
        let menu = this.$refs[`floating_menu--${planet.id}`]

        menu[0]._data.isActive = !menu[0]._data.isActive
      }
    }
  }
</script>

<style lang="scss">
  @import "../../style/variables_mixins";
  
  .instance--solar-sytem {
    .instance__background--solar-sytem-stars {
      background-color: #25182C;
      @include pixel-modifier-background("../../images/bg_milkyway_main_[modifier]x.jpg");
    }

    .instance__content {
      height: 100vh;
      width: 100vw;
    }
  }

  .solar-system {
    width: 0;
    height: 0;
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .solar-system__primary {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: yellow;
    transform: translateX(-50%) translateY(-50%);
  }

  .solar-system__orbital {
    position: absolute;
    left: -50px;
    top: -50px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: green;
    box-shadow: inset 0 0 0 3px white;
    transition: transform linear;
  }

  .solar-system__orbital-trigger {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    cursor: pointer;
  }
</style>
