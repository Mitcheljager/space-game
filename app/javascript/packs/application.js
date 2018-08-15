import Vue from "vue"
import App from "../app"

document.addEventListener("DOMContentLoaded", function() {
  const element = document.body;

  const app = new Vue({
    el: element,
    render: h => h(App)
  })

  console.log(app);
});
