<template>
  <section :class="`unit unit--${ unit.type }`" @mouseover="menuActive = !menuActive" @mouseout="menuActive = !menuActive">

    <component :is="unit.type"></component>
  </section>
</template>

<script>
  import { EventBus } from "../event_bus"
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
      EventBus.$on("pixelModifierChange", this.pixelModifierChangeHandler)
      this.pixelModifierChangeHandler()
    },
    methods: {
      pixelModifierChangeHandler: function() {
        this.$nextTick(() => {
          if (this.parent_unit && !this.grand_parent_unit) {
            this.$el.style.height = 16 * this.$root.$children[0]._data.pixelModifier + "px"
            this.$el.style.width = 16 * this.$root.$children[0]._data.pixelModifier * 1.5 + "px"
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/variables_mixins";

  $unit-types: (
    standard,
    windows
  );

  .unit {
    position: relative;
    height: pixel-modifier($unit-height);
    width: pixel-modifier($unit-width);
    padding: 5px;
    font-size: 14px;
    box-shadow: inset 0 0 0 1px gray;
    background-color: lightgrey;
    background-repeat: no-repeat;
    z-index: -1;

    @each $type in $unit-types {
      &--#{ $type } {
        background-color: none;
        @include pixel-modifier-background("../../images/unit/#{ $type }-[modifier]x.png");
        @include pixel-modifier-background("../../images/unit/#{ $type }-[modifier]x.png", "mask-image");

        &.unit--horizontal {
          @include pixel-modifier-background("../../images/unit/#{ $type }_horizontal-[modifier]x.png");
          @include pixel-modifier-background("../../images/unit/#{ $type }_horizontal-[modifier]x.png", "mask-image");
        }
      }
    }
  }

  .unit--node {
    height: pixel-modifier($unit-width);
    width: pixel-modifier($unit-width);
  }
</style>
