<template>
  <section class="instance">
    <slot name="interface"></slot>

    <div class="instance__content" :style="transform.position">
      <slot></slot>
    </div>

    <div :instance-parallax-background="background.speed" :instance-parallax-background-image="background.backgroundSpeed ? background.backgroundSpeed : 0" :class="['instance__background', `instance__background--${background.name}`]" v-for="background in backgrounds"></div>
  </section>
</template>

<script>
  import Impetus from "impetus"

  export default {
    props: ["backgrounds"],
    data: function () {
      return {
        currentlyDragging: false,

        clickedPositionY: 0,
        newPositionY: 0,
        elementPositionY: 0,

        clickedPositionX: 0,
        newPositionX: 0,
        elementPositionX: 0
      }
    },
    computed: {
      transform: function() {
        return {
          position: `transform: translateY(${this.elementPositionY}px) translateX(${this.elementPositionX}px)`
        }
      }
    },
    mounted: function() {
      const self = this
      new Impetus({
        update: function (x, y) {
          self.elementPositionX = x
          self.elementPositionY = y

          self.moveParallax(self.$el, x, y)
        }
      });
    },
    methods: {
      initiateDrag: function(e) {
        this.currentlyDragging = true

        this.clickedPositionY = e.pageY
        this.newPositionY = this.elementPositionY

        this.clickedPositionX = e.pageX
        this.newPositionX = this.elementPositionX
      },
      endDrag: function() {
        this.currentlyDragging = false
        this.elementPositionY = this.newPositionY
        this.elementPositionX = this.newPositionX
      },
      moveDrag: function(e) {
        if (this.currentlyDragging) {
          const element = this.$el
          const content = element.querySelector(".instance__content")

          let mouseChangeY = this.clickedPositionY - e.pageY
          this.newPositionY = this.elementPositionY - (mouseChangeY * 0.5)

          let mouseChangeX = this.clickedPositionX - e.pageX
          this.newPositionX = this.elementPositionX - (mouseChangeX * 0.5)

          content.style.transform = `translateY(${ this.newPositionY }px) translateX(${ this.newPositionX }px)`

          this.moveParallax(element, this.newPositionX, this.newPositionY)
        }
      },
      moveParallax: function(element, x, y) {
        const elementsToMove = element.querySelectorAll("[instance-parallax-background]")

        elementsToMove.forEach(function(element) {
          let elementSpeed = element.getAttribute("instance-parallax-background") / 100
          let elementBackgroundSpeed = element.getAttribute("instance-parallax-background-image") / 100

          element.style.transform = `translateY(${ y * elementSpeed }px) translateX(${ x * elementSpeed }px)`

          if (elementBackgroundSpeed)
            element.style.backgroundPosition = `calc(50% + ${ x * elementBackgroundSpeed }px) calc(50% + ${ y * elementBackgroundSpeed }px)`
        });
      }
    }
  }
</script>

<style>
  .instance {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    transform: none;
  }

  .instance__content {

  }

  .instance__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-position: center;
    background-repeat: no-repeat, repeat;
  }
</style>
