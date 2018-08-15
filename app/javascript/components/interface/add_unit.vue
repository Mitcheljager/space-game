<template>
  <div class="add-unit-menu">
    <interaction-menu :items="
      [
        { name: 'single', function: {
            name: 'addUnit', argument: 'test'
          }
        }, { name: 'second', function: {
            name: 'addUnit', argument: 'test 2'
          }
        }
      ]
    ">
    </interaction-menu>
  </div>
</template>

<script>
  import InteractionMenu from "./interaction_menu"

  export default {
    components: {
      InteractionMenu
    },
    data: function () {
      return {

      }
    },
    methods: {
      addUnit: function(data) {
        console.log(data)
        data.units.unshift("new item")
      }
    }
  }
</script>

<style lang="scss">
  .add-unit-menu {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>
