import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import ProductListView from "./views/view.product-list.vue";

Vue.config.productionTip = false;

const Application = new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  created() {

    this.fetchAndRouteCategories();
    this.anotherFetch();

  },
  data: {
    shop: {
      customer: {
        isCustomerLoggedIn: false,
        customerId: null,
        customerName: null
      },
      basket: {
        Items: [],
        Total: 0,
        Subtotal: 0
      },
      favourites: [],
      settings: {
        VAT: 0.2,
        Currency: "eur",
        Logo: "/assets/images/site-logo.svg"
      },
      socialMedia: [
        {
          icon: 'fab fa-facebook-f',
          url: 'https://www.facebook.com/my-page',
          title: 'Facebook'
        },
        {
          icon: 'fab fa-twitter',
          url: 'https://www.twitter.com/my-page',
          title: 'Twitter'
        },
        {
          icon: 'fab fa-pinterest',
          url: 'https://www.instagram.com/my-page',
          title: 'Instagram'
        },
        {
          icon: 'fab fa-facebook',
          url: 'https://www.pinterest.com/my-page',
          title: 'Pinterest'
        },
      ],
      promotions: {
        footer: {
          url: '/',
          title: 'Award winners - Fashion awards 2016',
          content: '<b>Award winners</b><br/>Fashion awards 2016'
        }
      }
    },
    settings: {
      customer: {
        isCustomerLoggedIn: false,
        customerName: null
      },
      basket: {
        items: [],
        total: 0,
        subtotal: 0
      },
      favourites: [],
      shop: {
        vat: 0.2,
        currency: "eur",
        logo: "/assets/images/site-logo.svg"
      }
    },
    currencies: {
      eur: {
        id: "eur",
        tag: "EUR",
        symbol: "€",
        value: 1,
        default: true
      },
      usd: {
        id: "usd",
        tag: "USD",
        symbol: "$",
        value: 1.1298
      },
      gbp: {
        id: "gbp",
        tag: "GBP",
        symbol: "£",
        value: 0.8764
      }
    }
  },
  methods: {
    anotherFetch() {
      return axios.get('/data/data.page-structure.json').then(response => {

        let data = response.data['routes'];
        let routes = [];


      });
    },
    fetchAndRouteCategories() {
      return axios.get("/data/data.product-categories.json").then(response => {

        let Routes = [];

        function ParseTree(tree, path, breadcrumb) {
          tree.forEach(element => {

            let Bread = [
              {
                path: path + element.slug,
                title: element.title
              }
            ];
            
            let Breadcrumbs = breadcrumb.concat(Bread);

            Routes.push({
              path: path + element.slug,
              meta: {
                title: element.title,
                breadcrumbs: Breadcrumbs,
                catId: element.id,
                hasLink: element.hasLink,
                hasChildren:
                  element.hasOwnProperty("children") &&
                  element.children.length > 0
              },
              component: ProductListView
            });

            if(element.hasOwnProperty("children")) {
              ParseTree(
                element.children,
                path + element.slug + "/",
                Breadcrumbs
              );
            }

          });
        }

        ParseTree(response.data.children, response.data.root, []);

        this.$router.addRoutes(Routes);

      });
    }
  }
});
