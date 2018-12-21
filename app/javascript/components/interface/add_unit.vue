<template>
  <div class="add-unit" :style="`left: ${ positionX }px; top: ${ positionY }px`" v-if="isActive">
    <div class="add-unit__menu" menu="add-unit" v-if="isMenuActive == 'module'">
      <a v-for="unitType in unitTypes" class="add-unit__item" @click="addUnit($event, unitType.type)">
        {{ unitType.type }}
      </a>
    </div>

    <InteractionMenu :openOnCreate="true">
      <a class="bubble-menu__item" ref="AddUnit" @click="toggleAddUnitMenu(`module`)">
        <div class="bubble-menu__item-content">
          Module
        </div>
      </a>

      <a class="bubble-menu__item" ref="AddUnit" @click="toggleAddUnitMenu(`utility`)">
        <div class="bubble-menu__item-content">
          Utility
        </div>
      </a>

      <a class="bubble-menu__item" ref="AddUnit" @click="toggleAddUnitMenu(`special`)">
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
        markerOrder: ["top", "right", "bottom", "left"],
        unitTypes: [
          { type: "standard", markers: ["top", "bottom"] },
          { type: "cooled", markers: ["top", "bottom"] },
          { type: "dock", markers: ["bottom"] },
          { type: "engine", markers: ["top"] },
          { type: "fuel", markers: ["top", "bottom"] },
          { type: "node", markers: ["top", "bottom", "left", "right"] },
          { type: "reinforced", markers: ["top", "bottom"] },
          { type: "storage", markers: ["top", "bottom"] },
          { type: "solar_array_large", markers: [] },
          { type: "windows", markers: ["top", "bottom"] }
        ],
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
      toggleAddUnitMenu: function(menuName = "") {
        if (menuName == this.isMenuActive) {
          this.isMenuActive = ""
        } else {
          this.isMenuActive = menuName
        }
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
      addUnit: function(e, unitType) {
        let units = this.$parent.$parent._data.units
        let newUnit = { id: Math.random().toString(36).substr(2, 8), type: unitType }

        if (this.activeUnit.parent_unit) {
          units[this.activeUnit.parent_unit][this.activeUnit.direction].splice(this.activeUnit.unit + 1, 0, newUnit)
        } else {
          units.splice(this.activeUnit.unit + 1, 0, newUnit)
        }

        this.$children[0]._data.isActive = false
        this.isActive = false
        this.isMenuActive = false

        this.$nextTick(function () {
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
          const unitType = this.unitTypes.find(item => item.type == component.unit.type)

          unitType.markers.forEach((alignment) => {
            let marker = document.createElement("div")

            marker.classList.add("add-unit-marker")
            marker.addEventListener("click", this.setAddUnitMenu)
            marker.dataset.unit = component.unit.id

            if (component._props.parent_unit) {
              let markerIndex = this.markerOrder.findIndex(item => item == alignment) + 1
              alignment = this.markerOrder[markerIndex]
            }

            marker.classList.add(`add-unit-marker--align-${alignment}`)

            component.$el.appendChild(marker)
          })
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

  $marker-size: calc(var(--pixel-modifier) * 2px);

  .add-unit-marker {
    position: absolute;
    width: 100%;
    height: $marker-size;
    background: rgba(blue, .1);
    top: 0;
    left: 0;

    &--align-left {
      top: 0;
      width: $marker-size;
      height: 100%;
    }

    &--align-right {
      top: 0;
      left: auto;
      right: 0;
      width: $marker-size;
      height: 100%;
    }

    &--align-bottom {
      top: auto;
      bottom: 0;
      width: 100%;
      height: $marker-size;
    }
  }
</style>
