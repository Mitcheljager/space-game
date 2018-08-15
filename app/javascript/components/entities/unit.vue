<template>
  <div class="unit">
    {{ type }}
  </div>
</template>

<script>
  export default {
    props: ["type"],
    data: function () {
      return {

      }
    }
  }
</script>

<style>
  .unit {
    height: 300px;
    width: 150px;
    border: 1px solid grey;
    background: lightgrey;
  }

  .instance div:first-child .unit {

  }
</style>
