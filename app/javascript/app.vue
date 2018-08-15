<template>
  <div class="board">
    <station></station>
  </div>
</template>

<script>
  import Station from "components/instances/station"

  export default {
    components: {
      Station
    },
    data: function () {
      return {
        test: "test"
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .board {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    user-select: none;
  }
</style>
