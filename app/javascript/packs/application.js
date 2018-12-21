import Vue from "vue"
import App from "components/app"

document.addEventListener("DOMContentLoaded", function() {
  const element = document.body

  const app = new Vue({
    el: element,
    render: h => h(App),
    data: function() {
      return {
        units: [
          { id: "ndi0p119", type: "engine" },
          { id: "anujh12m", type: "storage" },
          { id: "padnmad8", type: "node",
            right: [
              { id: "anmnad91", type: "dock" }
            ],
            left: [
              { id: "bna72y1h", type: "windows" },
              { id: "iuina872", type: "standard",
                top: [
                  { id: "mkl9022m", type: "solar_array_large" }
                ],
                bottom: [
                  { id: "anmnad91", type: "solar_array_large" }
                ]
              }
            ]
          },
          { id: "nbha72al", type: "standard" }
        ]
      }
    }
  })
});
