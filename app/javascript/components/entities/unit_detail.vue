<template>
  <div class="unit-wrapper">
    <section class="unit" :unit="unit.id"></section>

    <div v-if="unit.right_side" :unit-detail="unit.id" class="unit-wrapper unit-wrapper--right-side">
      <section v-for="unit in unit.right_side" :unit="unit.id" class="unit"></section>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["unit"]
  }
</script>

<style lang="scss" scoped>
  $unit-height: 400px;
  $unit-width: 200px;

  .unit {
    height: $unit-height;
    width: $unit-width;
    padding: 5px;
    font-size: 12px;
    border: 1px solid grey;
    background: lightgrey;
  }
</style>
