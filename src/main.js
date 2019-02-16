import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ProductListView from './views/view.product-list.vue';

Vue.config.productionTip = false

const Application = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeCreate() {

    /*
    Fetch product categories
    Create routing options
    */
    axios.get('/data/data.product-categories.json').then(response => {

      let Routes = [];

      function TreeToObjects (tree, path, breadcrumb) {

        tree.forEach(element => {

          let bread = [{
            path: path + element.slug,
            title: element.title
          }];

          let breadcrumbs = breadcrumb.concat(bread);

          Routes.push({
            path: path + element.slug,
            meta: {
              title: element.title,
              breadcrumbs: breadcrumbs,
              catId: element.id,
              hasLink: element.hasLink,
              hasChildren: element.hasOwnProperty('children') && element.children.length > 0
            },
            component: ProductListView
          });

          if (element.hasOwnProperty('children')) {
            TreeToObjects(element.children, path + element.slug + '/', breadcrumbs);
          }

        });
      }
      
      TreeToObjects(response.data.children, response.data.root, []);

      this.$router.addRoutes(Routes);

    });

  },
  data: {
    settings: {
      basket: {
        items: [],
        total: 0,
        subtotal: 0
      },
      favourites: [],
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
