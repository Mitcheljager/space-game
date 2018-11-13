<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  .button {
    appearance: none;
    border: 0;
    background: orange;
    color: black;
    font-family: inherit;
    font-size: inherit;
    padding: 3px 6px;
    width: 100%;
    box-shadow: inset 3px 3px 0 lighten(orange, 15%), 3px 3px 0 darken(orange, 15%);
    margin-top: 15px;
    cursor: pointer;
  }
</style>
