<template>
  <div class="add-unit">
    <div class="add-unit__menu" menu="add-unit" v-if="isActive">
      <a v-for="unitType in unitTypes" class="add-unit__item" @click="addUnit($event)">
        {{ unitType }}
      </a>
    </div>

    <interaction-menu>
      <a class="bubble-menu__item" ref="AddUnit" @click="toggleAddUnitMenu()">
        <div class="bubble-menu__item-content">
          +
        </div>
      </a>
      <a class="bubble-menu__item" ref="AddUnit" @click="toggleAddUnitMenu()">
        <div class="bubble-menu__item-content">
          ?
        </div>
      </a>
    </interaction-menu>
  </div>
</template>

<script>
  import InteractionMenu from "./interaction_menu"
  import $ from "jquery"

  export default {
    components: {
      InteractionMenu
    },
    data: function() {
      return {
        unitTypes: ["Standard", "Windows", "Armored"],
        isActive: false
      }
    },
    methods: {
      toggleAddUnitMenu: function() {
        this.isActive = !this.isActive
      },
      addUnit: function(e) {
        const element = this.$parent.$el
        const content = element.querySelector(".instance__content")

        this.$parent.$parent._data.units.unshift({ id: "dai8oa9o", type: "armored" })

        this.$parent._data.elementPositionY = this.$parent._data.elementPositionY - 50

        this.$children[0]._data.isActive = false
        this.isActive = false

        console.log(this.$parent._data.elementPositionY)
      }
    }
  }
</script>

<style lang="scss">
  .add-unit {
    display: flex;
    justify-content: center;
  }

  .add-unit__menu {
    position: absolute;
    left: 0;
    top: -60px;
    width: 100%;
    max-width: 200px;
    transform: translateY(-100%);
    z-index: 10;
  }

  .add-unit__item {
    display: block;
    width: 100%;
    padding: 5px;
    margin-bottom: .25rem;
    color: white;
    background: red;
  }
</style>
