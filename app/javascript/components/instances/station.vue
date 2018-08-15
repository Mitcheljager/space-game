<template>
  <instance class="instance--station" :backgrounds="
    [
      { name: 'station-stars', speed: '0' },
      { name: 'station-earth', speed: '2' }
    ]
  ">
    <AddUnit></AddUnit>

    <div v-for="unit in units">
      <unit :type="unit"></unit>
    </div>

    <AddUnit></AddUnit>
  </instance>
</template>

<script>
  import Instance from "../instance"
  import Unit from "../entities/unit"
  import AddUnit from "../interface/add_unit"

  export default {
    components: {
      Instance,
      Unit,
      AddUnit
    },
    data: function () {
      return {
        units: [1, 2, 3]
      }
    }
  }
</script>

<style lang="scss">
  .instance--station {
    display: grid;
    grid-auto-columns: auto;
    grid-auto-rows: auto;
    padding: 100px 100px;
    justify-content: center;

    .instance__background--station-stars {
      background: url("https://s6.postimg.cc/unjz87dz5/grd.png");
    }

    .instance__background--station-earth {
      left: 70vw;
      top: 20vh;
      height: 200px;
      width: 200px;
      border-radius: 50%;
      background: orange;
    }
  }
</style>
