<template>
  <Instance class="instance--station-detail" :backgrounds="
    [
      { name: 'station-detail-stars', speed: '0' },
      { name: 'station-detail-earth', speed: '2' }
    ]
  ">
    <UnitDetail :unit="unit" v-for="unit in units" @click.native="openStation()"></UnitDetail>
  </Instance>
</template>

<script>
  import Instance from "../instance"
  import UnitDetail from "../entities/unit_detail"

  export default {
    components: {
      Instance,
      UnitDetail
    },
    data: function () {
      return {
        units: [
          { id: "asdj98a1", type: "standard" },
          { id: "pejkm291", type: "standard",
            right_side: [
              { id: "anha8218", type: "standard" },
              { id: "anha8218", type: "standard" },
              { id: "anha8218", type: "standard" },
              { id: "iuina872", type: "standard",
                right_side: [
                  { id: "anha8218", type: "solar_array_large" },
                  { id: "iuina872", type: "solar_array_large" }
                ]
              }
            ]
          },
          { id: "281hndaa", type: "standard" },
          { id: "281hndaa", type: "standard" },
          { id: "pejkm291", type: "standard",
            right_side: [
              { id: "anha8218", type: "standard" },
              { id: "iuina872", type: "standard" }
            ]
          },
          { id: "281hndaa", type: "standard" },
        ]
      }
    },
    methods: {
      openStation: function() {
        this.$parent._data.activeInstance = "station"
      }
    }
  }
</script>

<style lang="scss">
  .instance--station-detail {
    display: grid;
    grid-auto-columns: auto;
    grid-auto-rows: auto;
    padding: 100px 100px;
    place-items: center;

    .instance__background--station-detail-stars {
      background: url("https://s6.postimg.cc/unjz87dz5/grd.png");
    }

    .instance__background--station-detail-earth {
      left: 70vw;
      top: 20vh;
      height: 200px;
      width: 200px;
      border-radius: 50%;
      background: orange;
    }
  }
</style>
