<template>
  <Instance class="instance--current-orbit" :backgrounds="[{ name: 'current-orbit-stars', speed: 0, backgroundSpeed: 1 }]">
    <div class="temp-interface" slot="interface">{{ orbitData }}</div>

    <div class="orbit">
      <div class="orbit__primary" :style="stylePrimary()"></div>

      <div class="orbit__orbital" v-for="orbit in orbitData" :style="styleObject(orbit)" @click="toggleFloatingMenu(orbit)">
        <FloatingMenu :ref="`floating_menu--${ orbit.id }`">
          <Button @click.native="openOrbital('Station')">Show Orbital</Button>
        </FloatingMenu>
      </div>

      <div class="orbit__orbital" v-for="asteroid in asteroidData" v-if="asteroid.planet_id == primaryData.id" :style="styleAsteroid(asteroid)"></div>
    </div>
  </Instance>
</template>

<script>
  import Instance from "../instance"
  import Seedrandom from "seedrandom"
  import FloatingMenu from "../interface/floating_menu"
  import Button from "../interface/button"

  export default {
    components: {
      Instance,
      FloatingMenu,
      Button
    },
    data: function () {
      let asteroidDataRng = []

      for( let i = 1 ; i < 500; i++ ) {
        let newData = {
          id: `${ Math.floor(Math.random() * 360) }`,
          seed: `${ i }`,
          planet_id: `${ Math.floor(Math.random() * 9) }`,
          speed: `${ Math.ceil(Math.random() * 19) }`
        }

        asteroidDataRng.push(newData)
      }

      return {
        primaryData: "",
        orbitData: "",
        asteroidData: asteroidDataRng
      }
    },
    mounted: function() {
      this.$nextTick(function() {
        this.setRotationSpeeds()
        this.getOrbitData()
      })
    },
    methods: {
      openOrbital: function(target) {
        this.$root.$children[0].$data.activeInstance = target
      },
      getOrbitData: function() {
        fetch(`/orbits/${ this.primaryData.id }`, { headers: { "Content-Type": "application/json; charset=utf-8" }}).then(
          res => res.json()
        ).then(response => {
          this.orbitData = response
        }).catch(err => {
          //
        })
      },
      styleObject: function(orbit) {
        return {
          transform: `translateX(${ orbit.distance }px) rotate(${ orbit.location }deg)`,
          transformOrigin: `-${ orbit.distance }px center`,
          zIndex: 10
        }
      },
      styleAsteroid: function(asteroid) {
        let distance = new Math.seedrandom(asteroid.seed)
        let rotation = new Math.seedrandom(asteroid.id)

        distance = distance() / (distance() * 10) * 1000 + 250
        rotation = 360 * rotation()

        return {
          width: "20px",
          height: "20px",
          background: "brown",
          transform: `translateX(${ distance }px) rotate(calc(${ rotation }deg + var(--rotation-${ asteroid.speed })))`,
          transformOrigin: `-${ distance }px center`,
          transitionDuration: asteroid.speed * 1000 + "ms"
        }
      },
      stylePrimary: function() {
        let size = 450

        return {
          width: size + "px",
          height: size + "px",
          background: this.primaryData.color
        }
      },
      setRotationSpeeds: function() {
        const element = this.$el

        for( let i = 1 ; i < 20; i++ ) {
          let degree = 0
          element.style.setProperty(`--rotation-${ i }`, `${ degree }deg`)

          let setRotation = ""

          setRotation = setInterval(function() {
            if (document.hasFocus()) {
              degree = degree - 1
              element.style.setProperty(`--rotation-${ i }`, `${ degree }deg`)
            }
          }, i * 1000)
        }
      },
      toggleFloatingMenu: function(orbit) {
        let menu = this.$refs[`floating_menu--${orbit.id}`]

        menu[0]._data.isActive = !menu[0]._data.isActive

        if (menu[0]._data.isActive) {
          this.$nextTick(function() {
            menu[0].$el.style.transform = `rotate(-${ orbit.location }deg)`
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../style/variables_mixins";
  
  .instance--current-orbit {
    .instance__background--current-orbit-stars {
      background-color: #25182C;
      @include pixel-modifier-background("../../images/bg_milkyway_main_[modifier]x.jpg");
    }

    .instance__content {
      height: 100vh;
      width: 100vw;
    }
  }

  .orbit {
    width: 0;
    height: 0;
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .orbit__primary {
    position: relative;
    border-radius: 50%;
    background: blue;
    top: -20px;
    left: -20px;
    transform: translateX(-50%) translateY(-50%);

    &::before {
      content: "";
      display: block;
      background: yellow;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%);
    }
  }

  .orbit__orbital {
    position: absolute;
    left: -25px;
    top: -25px;
    width: 50px;
    height: 50px;
    background: green;
    transform-origin: -225px center;
    transition-property: transform;
    transition-timing-function: linear;
  }
</style>
