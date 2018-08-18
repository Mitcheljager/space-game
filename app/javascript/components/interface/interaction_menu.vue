<template>
  <nav :class="['bubble-menu', {'bubble-menu--is-active': isActive}]" @click="toggleState($event)">
    <slot></slot>
  </nav>
</template>

<script>
  export default {
    props: ["items"],
    data: function() {
      return {
        isActive: false
      }
    },
    created: function() {
    },
    methods: {
      toggleState: function(e) {
        if (e.target.tagName.toLowerCase() == "nav")
          this.isActive = !this.isActive
      }
    }
  }
</script>

<style lang="scss">
  $bubble-size: 50px;
  $bubbles-max: 6;
  $y-offset: 85px;
  $bubble-spacing: 360 / $bubbles-max;
  $transition-duration: 300ms;

  @keyframes bounce {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }

  .bubble-menu {
    display: block;
    position: relative;
    width: $bubble-size;
    height: $bubble-size;
    cursor: pointer;
    animation: bounce $transition-duration;
    animation-delay: $transition-duration / 2;

    &::after {
      display: block;
      content: "";
      position: relative;
      width: $bubble-size;
      height: $bubble-size;
      border-radius: 50%;
      background: red;
      transition: transform $transition-duration;
    }

    &:not(.bubble-menu--is-active):active {
      &::after {
        transform: scale(1.2);
        transition-duration: $transition-duration / 3;
      }
    }

    &--is-active {
      animation: none;

      &::after {
        transform: scale(0.5);
        transition: transform $transition-duration #{ $transition-duration / 2 };
      }

      .bubble-menu__item {
        opacity: 1;

        @for $i from 1 through $bubbles-max {
          &:nth-child(#{ $i }) {
            transform: translateY(calc(50% - #{ $y-offset })) rotate(-90deg + ($i - 1) * $bubble-spacing);
            transform-origin: center $y-offset;
            transition-delay: ($i - 1) * ($transition-duration / $bubbles-max);

            .bubble-menu__item-content {
              transform: rotate(90deg + ($i - 1) * $bubble-spacing * -1);
              transition-delay: ($i - 1) * ($transition-duration / $bubbles-max);
            }
          }
        }
      }
    }

    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      width: $bubble-size;
      height: $bubble-size;
      opacity: 0;
      border-radius: 50%;
      background: blue;
      color: white;
      transform: scale(0);
      transition: transform, transform-origin, height, width, opacity;
      transition-duration: $transition-duration;

      @for $i from 1 through $bubbles-max {
        &:nth-child(#{ $i }) {
          transform: translateY(0) rotate(0);
          transform-origin: 0;
          transition-delay: ($bubbles-max - $i) * ($transition-duration / $bubbles-max);

          .bubble-menu__item-content {
            transform: rotate(0);
            transition: transform $transition-duration;
            transition-delay: ($bubbles-max - $i) * ($transition-duration / $bubbles-max);
          }
        }
      }
    }

    &__item-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: $bubble-size;
      height: $bubble-size;
      position: relative;
    }
  }
</style>
