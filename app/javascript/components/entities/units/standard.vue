<template>
  <section>
    <div v-if="ifStationDetail">
      <div class="module-divider module-divider--position-1"></div>

      <div class="modules-container modules-container--position-1">
        <Module></Module>
        <Module></Module>
        <Module></Module>
        <Module></Module>
      </div>

      <div class="modules-container modules-container--position-2">
        <Module></Module>
        <Module></Module>
        <Module></Module>
        <Module></Module>
      </div>

      <div class="module-divider module-divider--position-2"></div>
    </div>
  </section>
</template>

<script>
  import { EventBus } from "../../event_bus"
  import Module from "../module.vue"

  export default {
    components: {
      Module
    },
    data: function() {
      return {

      }
    },
    mounted: function() {
      EventBus.$on("pixelModifierChange", this.pixelModifierChangeHandler)
      this.pixelModifierChangeHandler()
    },
    computed: {
      ifStationDetail: function() {
        const activeInstance = this.$root.$children[0].activeInstance

        if (activeInstance == "StationDetail") return true
      }
    },
    methods: {
      pixelModifierChangeHandler: function() {
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/variables_mixins";

  .modules-container--position-1 {
    top: pixel-modifier($grid-size * .75);
    left: 0;

    @include node-horizontal {
      top: 0;
      left: pixel-modifier($grid-size * .75);
    }
  }

  .modules-container--position-2 {
    top: pixel-modifier($grid-size * .75);
    right: 0;

    @include node-horizontal {
      top: auto;
      bottom: 0;
      left: pixel-modifier($grid-size * .75);

      /deep/ .module {
        height: pixel-modifier($grid-size);
      }
    }
  }
</style>
