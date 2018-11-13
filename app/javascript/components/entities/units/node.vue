<template>
  <div>
    Node
  </div>
</template>

<script>
  import { EventBus } from "../../event_bus"
  import AddUnit from "../../interface/add_unit"

  export default {
    components: {
      AddUnit
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
        this.$el.parentElement.style.height = this.$el.parentElement.getBoundingClientRect().width + "px"
      }
    }
  }
</script>

<style lang="scss">
</style>
