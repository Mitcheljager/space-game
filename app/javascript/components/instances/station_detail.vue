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
        units: [
          { id: "ndi0p119", type: "engine" },
          { id: "anujh12m", type: "fuel" },
          { id: "98y21rna", type: "storage" },
          { id: "pejkm291", type: "node",
            right: [
              { id: "ad87a987", type: "standard" },
              { id: "anandas8", type: "windows" },
              { id: "ba882a18", type: "standard" },
              { id: "pooia872", type: "standard",
                top: [
                  { id: "mkl9022m", type: "solar_array_large" }
                ],
                bottom: [
                  { id: "anmnad91", type: "solar_array_large" }
                ]
              }
            ],
            left: [
              { id: "bpcma28a", type: "standard" },
              { id: "uryq28ad", type: "reinforced" },
              { id: "bn87ioa1", type: "cooled" },
              { id: "aan2a872", type: "standard",
                top: [
                  { id: "adsjhj12", type: "solar_array_large" }
                ],
                bottom: [
                  { id: "mnbha127", type: "solar_array_large" }
                ]
              }
            ]
          },
          { id: "281hndaa", type: "standard" },
          { id: "asdj98a1", type: "node",
            right: [
              { id: "anmnad91", type: "dock" }
            ]
          },
          { id: "2bna2c1a", type: "standard" },
          { id: "padnmad8", type: "node",
            right: [
              { id: "b9871dan", type: "standard" },
              { id: "bcada888", type: "standard" }
            ],
            left: [
              { id: "bna72y1h", type: "standard" },
              { id: "iuina872", type: "standard" }
            ]
          },
          { id: "nbha72al", type: "standard" }
        ]
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
      margin-left: pixel-modifier(($unit-width * $unit-modifier) / 2);
      margin-bottom: pixel-modifier(($unit-height * $unit-modifier) / 2);
      transform: translateY(-100%);
    }

    &--bottom-side {
      position: absolute;
      flex-direction: column;
      margin-left: pixel-modifier(($unit-width * $unit-modifier) / 2);
      margin-top: pixel-modifier(($unit-height * $unit-modifier) / 2);
    }
  }
</style>
