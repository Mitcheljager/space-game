<template>
  <Instance class="instance--station-detail" ref="instance-station-detail" :backgrounds="
    [
      { name: 'station-detail-stars', speed: 0, backgroundSpeed: 0.25 },
      { name: 'station-detail-earth', speed: 2, backgroundSpeed: 0.25 }
    ]
  ">
    <div class="station-wing" v-for="(unit, index) in [].concat(units).reverse()">
      <Unit :unit="unit"></Unit>

      <div v-for="direction in directions" v-if="unit[direction.direction]" :class="`station-wing station-wing--${ direction.direction }-side`">
        <div v-for="child_unit in (direction.reverse ? [].concat(unit[direction.direction]).reverse() : unit[direction.direction])" class="station-wing">
          <Unit :unit="child_unit" :parent_unit="unit" :direction="direction.direction"></Unit>

          <div v-for="direction in [`top`, `bottom`]" v-if="child_unit[direction]" :class="`station-wing station-wing--${ direction }-side`">
            <div v-for="grand_child_unit in child_unit.top" class="station-wing">
              <Unit :unit="grand_child_unit" :parent_unit="child_unit" :grand_parent_unit="unit" :direction="direction" :disable_add_unit="true"></Unit>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Instance>
</template>

<script>
  import Instance from "../instance"
  import Unit from "../entities/unit_detail"

  export default {
    components: {
      Instance,
      Unit
    },
    methods: {
    },
    data: function () {
      return {
        directions: [
          { direction: "left", reverse: true },
          { direction: "right", reverse: false }
        ],
        units: this.$root.units
      }
    }
  }
</script>

<style lang="scss">
  @import "../../style/variables_mixins";

  .instance--station-detail {
    display: grid;
    grid-auto-columns: auto;
    grid-auto-rows: auto;
    padding: 100px 100px;
    place-items: center;

    /deep/ .instance__background--station-detail-stars {
      background-color: #25182C;
      @include pixel-modifier-background("../../images/bg_milkyway_main_[modifier]x.jpg");
    }

    /deep/ .instance__background--station-detail-earth {
      left: 70vw;
      top: 20vh;
      height: 450px;
      width: 450px;
      border-radius: 50%;
      background: blue;
    }
  }

  .station-wing {
    display: flex;
    position: relative;
    z-index: -1;

    &--right-side {
      position: absolute;
      margin-left: pixel-modifier($unit-width * $unit-modifier);

      /deep/ .station-wing {
        @for $i from 1 through 10 {
          &:nth-child(#{$i}) {
            z-index: (10 - $i);
          }
        }
      }
    }

    &--left-side {
      position: absolute;
      margin-right: pixel-modifier($unit-width * $unit-modifier);
      transform: translateX(-100%);
    }

    &--top-side {
      position: absolute;
      flex-direction: column;
      margin-left: pixel-modifier(($unit-width * $unit-modifier) / 4);
      margin-bottom: pixel-modifier(($unit-height * $unit-modifier) / 1.5);
      transform: translateY(-100%);
    }

    &--bottom-side {
      position: absolute;
      flex-direction: column;
      margin-left: pixel-modifier(($unit-width * $unit-modifier) / 4);
      margin-top: pixel-modifier(($unit-height * $unit-modifier) / 1.5);
    }
  }
</style>
