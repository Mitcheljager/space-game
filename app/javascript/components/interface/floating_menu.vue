<template>
  <nav class="floating-menu" v-if="isActive">
    <div class="floating-menu__content">
      <div class="floating-menu__inside">
        <slot></slot>
      </div>
    </div>

    <div class="floating-menu__border">
      <div class="pixels"></div>
    </div>

    <div class="floating-menu__line"></div>
  </nav>
</template>

<script>
  export default {
    data: function() {
      return {
        isActive: false
      }
    },
    methods: {
      positionWindow: function() {
        this.$nextTick(function() {
          const element = this.$el
          const elementContent = element.children[0]
          const elementLine = element.children[2]
          const parentElement = element.parentElement

          let parentElementWidth = parentElement.getBoundingClientRect().width
          let parentElementHeight = parentElement.getBoundingClientRect().height

          let elementContentHeight = elementContent.getBoundingClientRect().height
          let elementFromTop = element.getBoundingClientRect().top
          let elementContentPosition = elementFromTop - elementContentHeight

          if (elementContentPosition > 150)
            elementContentPosition = 150

          if (elementContentPosition < 45)
            elementContentPosition = 45

          element.style.width = `${ parentElementWidth }px`
          element.style.height = `${ parentElementHeight }px`

          elementContent.style.left = `${ parentElementWidth / 2 }px`

          elementContent.style.top = `-${ elementContentPosition - 30 }px`
          elementLine.style.height = `${ elementContentPosition - 33 }px`
        })
      }
    },
    watch: {
      isActive: function(newState, oldState) {
        if (newState == true)
          this.positionWindow()
      }
    }
  }
</script>

<style lang="scss">
  $offset: 30px;
  $animationSpeed: 300ms;

  @keyframes fadeInBorder {
    from {
      clip-path: polygon(0 120%, 120% 120%, 120% 120%, 0% 120%);
    }

    to {
      clip-path: polygon(0 0, 120% 0, 120% 120%, 0% 120%);
    }
  }

  .floating-menu {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    display: flex;
    place-items: center;
  }

  .floating-menu__border {
    position: absolute;
    top: -#{ $offset / 2 };
    left: -#{ $offset / 2 };
    width: calc(100% + #{ $offset });
    height: calc(100% + #{ $offset });
    border: 3px dotted rgba(white, .3);
    border-radius: 50%;
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
    animation: fadeInBorder $animationSpeed forwards;
  }

  .floating-menu__line {
    position: absolute;
    top: -3px;
    left: 50%;
    height: 10px;
    width: 0px;
    border-right: 3px dotted rgba(white, .3);
    transform: translateX(-50%) translateY(calc(-100% - #{ $offset / 2 }));
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
    animation: fadeInBorder ($animationSpeed / 2)  $animationSpeed forwards;
  }

  .floating-menu__content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    top: 0;
    left: -150px;
    width: 300px;
    transform: translateX(-50%) translateY(calc(-100% - #{ $offset / 2 }));
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
    animation: fadeInBorder $animationSpeed ($animationSpeed * 1.5) forwards;
  }

  .floating-menu__inside {
    max-width: 80vw;
    padding: 20px;
    box-shadow: inset 0 0 0 3px rgba(white, .3), inset 3px 3px 0 rgba(white, .3), 6px 6px 0 rgba(black, .3);
    background: rgba(black, .35);
    color: white;
  }

  .pixels {
    width: 100%;
    height: 100%;
  }
</style>
