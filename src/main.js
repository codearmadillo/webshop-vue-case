import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const Application = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  data: {
    settings: {
      vat: 0.20,
      currency: 'eur'
    },
    basket: {
      items: [],
      total: 0,
      subtotal: 0
    }
  }
});
