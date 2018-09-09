<template>
  <div class="add-unit" :style="`left: ${ positionX }px; top: ${ positionY }px`" v-if="isActive">
    <div class="add-unit__menu" menu="add-unit" v-if="isMenuActive">
      <a v-for="unitType in unitTypes" class="add-unit__item" @click="addUnit($event)">
        {{ unitType }}
      </a>
    </div>

    <InteractionMenu :openOnCreate="true">
      <a class="bubble-menu__item" ref="AddUnit" @click="toggleAddUnitMenu()">
        <div class="bubble-menu__item-content">
          Add
        </div>
      </a>

      <a class="bubble-menu__item" ref="AddUnit" @click="toggleAddUnitMenu()">
        <div class="bubble-menu__item-content">
          Utility
        </div>
      </a>

      <a class="bubble-menu__item" ref="AddUnit" @click="toggleAddUnitMenu()">
        <div class="bubble-menu__item-content">
          Special
        </div>
      </a>
    </InteractionMenu>
  </div>
</template>

<script>
  import InteractionMenu from "./interaction_menu"

  export default {
    components: {
      InteractionMenu
    },
    data: function() {
      return {
        unitTypes: ["Standard", "Windows", "Reinforced"],
        isActive: false,
        isMenuActive: false,
        positionX: 0,
        positionY: 0,
        appendAfter: 0,
        activeUnit: []
        // Unit index for when adding units
      }
    },
    mounted: function() {
      this.renderMarkers()
    },
    beforeDestroy: function() {
      // this.$parent.$parent.$parent.$el.removeEventListener("click", this.setAddUnitMenu)
    },
    methods: {
      toggleAddUnitMenu: function() {
        this.isMenuActive = !this.isMenuActive
      },
      setAddUnitMenu: function(e) {
        const units = this.$parent.$parent._data.units
        const element = e.path[0]
        const component = element.closest(".unit").__vue__

        let unitIndex = units.findIndex(item => item.id == component.unit.id)
        this.activeUnit = { unit: unitIndex }

        if (component._props.parent_unit) {
          unitIndex = units.findIndex(item => item.id == component._props.parent_unit.id)
          let wing = units[units.findIndex(item => item.id == component._props.parent_unit.id)][component._props.direction]
          let childIndex = wing.findIndex(item => item.id == component.unit.id)

          this.activeUnit = { unit: childIndex, parent_unit: unitIndex, direction: component._props.direction }
        }

        this.isActive = true

        this.positionX = e.pageX
        this.positionY = e.pageY
      },
      addUnit: function(e) {
        let units = this.$parent.$parent._data.units
        let newUnit = { id: Math.random().toString(36).substr(2, 8), type: "reinforced" }

        if (this.activeUnit.parent_unit) {
          console.log(this.activeUnit)
          units[this.activeUnit.parent_unit][this.activeUnit.direction].splice(this.activeUnit.unit + 1, 0, newUnit)

        } else {
          units.splice(this.activeUnit.unit + 1, 0, newUnit)
        }

        this.$children[0]._data.isActive = false
        this.isActive = false

        this.$nextTick( function () {
          this.renderMarkers()
        })
      },
      renderMarkers: function() {
        let markers = document.getElementsByClassName("add-unit-marker")

        Array.from(markers).forEach((marker) => {
          marker.removeEventListener("click", this.setAddUnitMenu)
          marker.remove()
        })

        let unitElements = document.getElementsByClassName("unit")

        Array.from(unitElements).forEach((unit) => {
          const component = unit.__vue__

          if (!component._props.grand_parent_unit) {
            let marker = document.createElement("div")

            marker.classList.add("add-unit-marker")
            marker.addEventListener("click", this.setAddUnitMenu)
            marker.dataset.unit = component.unit.id

            let alignment = "top"
            if (component._props.direction)
              alignment = component._props.direction

            marker.classList.add(`add-unit-marker--align-${alignment}`)

            component.$el.appendChild(marker)
          }
        })
      }
    },
    watch: {
      positionX: function(value) {
        this.isActive = false

        this.$nextTick( function () {
          this.isActive = true
        })
      }
    }
  }
</script>

<style lang="scss">
  .add-unit {
    position: fixed;
    display: flex;
    justify-content: center;
    z-index: 10;
    transform: translate(-50%, -50%);
  }

  .add-unit__menu {
    position: absolute;
    left: 0;
    top: -60px;
    width: 200px;
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

  .add-unit-marker {
    position: absolute;
    width: 100%;
    height: 10px;
    background: blue;
    top: 0;
    left: 0;

    &--align-left {
      width: 10px;
      height: 100%;
    }

    &--align-right {
      left: auto;
      right: 0;
      width: 10px;
      height: 100%;
    }
  }
</style>
