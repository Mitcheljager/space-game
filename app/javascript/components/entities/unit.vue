<template>
  <section :class="`unit unit--${ unit.type }`" @mouseover="menuActive = !menuActive" @mouseout="menuActive = !menuActive">
    <small><em>{{ unit.id }}</em></small>

    <component :is="unit.type"></component>
  </section>
</template>

<script>
  import Standard from "./units/standard"
  import Cooled from "./units/cooled"
  import Dock from "./units/dock"
  import Engine from "./units/engine"
  import Fuel from "./units/fuel"
  import Node from "./units/node"
  import Reinforced from "./units/reinforced"
  import Storage from "./units/storage"
  import Solar_array_large from "./units/solar_array_large"
  import Windows from "./units/windows"

  export default {
    components: {
      Standard,
      Cooled,
      Dock,
      Engine,
      Fuel,
      Node,
      Reinforced,
      Storage,
      Solar_array_large,
      Windows
    },
    props: ["unit", "parent_unit", "grand_parent_unit", "direction", "disable_add_unit"],
    data: function () {
      return {
        menuActive: false
      }
    },
    methods: {
      openStationDetail: function(e) {
        // Let's find another way than $parent * a lot
        if (!e.target.tagName.toLowerCase() == "nav")
          this.$parent.$parent.$parent._data.activeInstance = "stationDetail"
      }
    },
    mounted: function() {
      if (this.parent_unit && !this.grand_parent_unit) {
        let initialWidth = this.$el.offsetWidth
        let initialHeight = this.$el.offsetHeight

        this.$el.style.height = initialWidth + "px"
        this.$el.style.width = initialHeight + "px"
      }
    }
  }
</script>

<style lang="scss">
  $unit-height: 100px;
  $unit-width: 50px;

  .unit {
    position: relative;
    height: $unit-height;
    width: $unit-width;
    padding: 5px;
    font-size: 12px;
    box-shadow: inset 0 0 0 1px gray;
    background: lightgrey;
    z-index: -1;
  }
</style>
