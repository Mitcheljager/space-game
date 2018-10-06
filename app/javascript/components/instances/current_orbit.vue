<template>
  <Instance class="instance--current-orbit" :backgrounds="[{ name: 'current-orbit-stars', speed: '0' }]">
    <div class="orbit">
      <div class="orbit__primary"></div>

      <div class="orbit_orbital" @click="openOrbital('station')"></div>
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

      }
    },
    methods: {
      openOrbital: function(target) {
        this.$root.$children[0].$data.activeInstance = target
      }
    }
  }
</script>

<style lang="scss">
  .instance--current-orbit {
    .instance__background--current-orbit-stars {
      background: url("https://s6.postimg.cc/unjz87dz5/grd.png");
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
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: blue;
    transform: translateX(-50%) translateY(-50%);
  }

  .orbit_orbital {
    position: absolute;
    left: -25px;
    top: -25px;
    width: 50px;
    height: 50px;
    background: green;
    transform: translateX(200px) rotate(90deg);
    transform-origin: -200px center;
  }
</style>
