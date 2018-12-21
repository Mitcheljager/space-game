<template>
  <section class="module module--vegitation">
    <component is="vegitation"></component>
  </section>
</template>

<script>
  import { EventBus } from "../event_bus"
  import Communication from "./modules/communication"
  import Vegitation from "./modules/vegitation"

  export default {
    components: {
      Communication,
      Vegitation
    },
    props: ["module"],
    data: function () {
      return {
      }
    },
    methods: {
    },
    mounted: function() {
      EventBus.$on("pixelModifierChange", this.pixelModifierChangeHandler)
      this.pixelModifierChangeHandler()
    },
    methods: {
      pixelModifierChangeHandler: function() {
      }
    }
  }
</script>

<style lang="scss">
  @import "../../style/variables_mixins";

  .module {
    height: pixel-modifier($grid-size * 1.5);
    width: pixel-modifier($grid-size * 1.5);
    background: gray;
    border: 1px solid black;

    @include node-horizontal {
      height: pixel-modifier($grid-size * 2.5);
      width: pixel-modifier($grid-size * 1.5);
    }
  }

  .modules-container {
    position: absolute;

    @include node-horizontal {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }

  .module-divider {
    position: absolute;
    height: pixel-modifier($grid-size * .75);
    width: 100%;
    background: gray;
    border: 1px solid black;

    @include node-horizontal {
      height: 100%;
      width: pixel-modifier($grid-size * .75);
    }

    &--position-1 {
      left: 0;
      top: 0;
    }

    &--position-2 {
      right: 0;
      bottom: 0;
    }
  }
</style>
