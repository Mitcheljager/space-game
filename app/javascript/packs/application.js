import Vue from "vue"
import App from "components/app"

document.addEventListener("DOMContentLoaded", function() {
  const element = document.body

  const app = new Vue({
    el: element,
    render: h => h(App),
  })
});
