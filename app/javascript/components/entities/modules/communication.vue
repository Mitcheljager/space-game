<template>
  <div>
    Communication
  </div>
</template>

<script>
  import { EventBus } from "../../event_bus"

  export default {
    components: {

    },
    data: function() {
      return {

      }
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
</style>
