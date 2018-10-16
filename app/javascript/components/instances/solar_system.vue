<template>
  <Instance class="instance--solar-sytem" :backgrounds="[{ name: 'solar-sytem-stars', speed: '0' }]">
    <div class="solar-system" :style="wrapperStyle()">
      <div class="solar-system__primary" :style="primaryStyle()"></div>

      <div v-for="planet in solarSystemData"
        :style="styleObject(planet)"
        class="solar-system__orbital"
        @click="openOrbit('CurrentOrbit', planet.name)"></div>
    </div>
  </Instance>
</template>

<script>
  import Instance from "../instance"

  export default {
    components: {
      Instance
    },
    data: function () {
      return {
        star: { name: "Sun", size: 1392000, color: "yellow" },
        solarSystemData: [
          { name: "Mercury", size: 4879, distance: 2, color: "grey" },
          { name: "Venus", size: 12104, distance: 3.5, color: "orange" },
          { name: "Earth", size: 12756, distance: 6, color: "blue" },
          { name: "Mars", size: 6794, distance: 7.5, color: "red" },
          { name: "Jupiter", size: 142980, distance: 26, color: "lightgrey" },
          { name: "Saturn", size: 120540, distance: 96, color: "gold" },
          { name: "Uranus", size: 51120, distance: 150.5, color: "aqua" },
          { name: "Neptune", size: 49530, distance: 197.5, color: "darkblue" }
        ]
      }
    },
    methods: {
      openOrbit: function(target, targetData) {
        this.$root.$children[0].$data.activeInstance = target

        this.$nextTick(function() {
          this.$root.$children[0].$children[0]._data.orbitData = targetData
        })
      },
      styleObject: function(planet) {
        let distance = ((this.star.size / 500 / 2) + (planet.distance / 4 * 100) / 1.5)
        let size = planet.size / 500

        return {
          width: size + "px",
          height: size + "px",
          top: `-${ size / 2 }px`,
          left: `-${ size / 2 }px`,
          background: planet.color,
          transform: `translateX(${ distance }px) rotate(0deg)`,
          transformOrigin: `-${ distance }px center`,
        }
      },
      primaryStyle: function() {
        return {
          width: (this.star.size / 500) + "px",
          height: (this.star.size / 500) + "px",
          background: this.star.color
        }
      },
      wrapperStyle: function() {
        let offset = (this.star.size / 500) / 2

        return {
          transform: `translateX(-${ offset }px)`
        }
      }
    }
  }
</script>

<style lang="scss">
  .instance--solar-sytem {
    .instance__background--solar-sytem-stars {
      background: url("https://s6.postimg.cc/unjz87dz5/grd.png");
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
    transform: translateX(300px) rotate(0deg);
    transform-origin: -300px center;
  }
</style>
