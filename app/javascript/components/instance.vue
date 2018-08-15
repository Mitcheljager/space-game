<template>
  <section class="instance" @mousedown="initiateDrag($event)" @mouseup="endDrag()" @mousemove="moveDrag($event)">
    <div class="instance__content" :style="`transform: translateY(${elementPositionY}px) transform: translateX(${elementPositionX}px)`">
      <slot></slot>
    </div>

    <div :instance-parallax-background="background.speed" :class="['instance__background', `instance__background--${background.name}`]" v-for="background in backgrounds">

    </div>
  </section>
</template>

<script>
  export default {
    props: ["backgrounds"],
    data: function () {
      return {
        currentlyDragging: false,

        clickedPositionY: 0,
        newPositionY: 0,
        newPositionY: 0,
        elementPositionY: 0,

        clickedPositionX: 0,
        newPositionX: 0,
        newPositionX: 0,
        elementPositionX: 0
      }
    },
    methods: {
      initiateDrag: function(e) {
        this.currentlyDragging = true
        this.clickedPositionY = e.pageY
        this.clickedPositionX = e.pageX
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
          let newPositionY = this.elementPositionY - mouseChangeY
          this.newPositionY = newPositionY

          let mouseChangeX = this.clickedPositionX - e.pageX
          let newPositionX = this.elementPositionX - mouseChangeX
          this.newPositionX = newPositionX

          content.style.transform = `translateY(${ newPositionY }px) translateX(${ newPositionX }px)`

          this.moveParallax(element, newPositionX, newPositionY)
        }
      },
      moveParallax: function(element, x, y) {
        const elementsToMove = element.querySelectorAll("[instance-parallax-background]")

        elementsToMove.forEach(function(element) {
          let elementSpeed = element.getAttribute("instance-parallax-background") / 100
          element.style.transform = `translateY(${ y * elementSpeed * -1 }px) translateX(${ x * elementSpeed * -1 }px)`
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
  }

  .instance__content {
    position: relative;
  }

  .instance__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
</style>
