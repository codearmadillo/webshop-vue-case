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
      basket: {
        items: [],
        total: 0,
        subtotal: 0
      },
      shop: {
        vat: 0.20,
        currency: 'eur'
      }
    },
    currencies: {
      eur: {
        id: 'eur',
        tag: 'EUR',
        symbol: '€',
        value: 1,
        default: true
      },
      usd:  {
        id: 'usd',
        tag: 'USD',
        symbol: '$',
        value: 1.1298
      },
      gbp: {
        id: 'gbp',
        tag: 'GBP',
        symbol: '£',
        value: 0.8764
      }
    }
  }
});
