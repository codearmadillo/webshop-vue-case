import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueCookie from 'vue-cookie';
import { EventBus } from './event-bus';

import ProductListView from "./views/view.product-list.vue";
import ProductInfoView from "./views/view.product-details.vue";
import NotFoundView from "./views/view.not-found.vue";

Vue.use(VueCookie);    
Vue.config.productionTip = false;

const Application = new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App),
    created() {
      
        this.fetchAndRouteCategories();

    },
    beforeMount() {
        /* Cookies */
        let cookieBasket = this.$cookie.get('ave-activebasket');
        if(cookieBasket !== null) {
            this.shop.basket = JSON.parse(cookieBasket);
        }
    },
    mounted() {
        /* Events */
        EventBus.$on('add-to-basket', data => {
            
            let hit = null;
            let ctx = this.shop.basket.items;

            if(ctx.length > 0) {
                ctx.forEach((el, i) => {
                    if(el.basketMatrix === data.basketMatrix) {
                        hit = i;
                    }
                });
            }
            if(hit === null) {
                this.shop.basket.items.push(data);
            } else {
                this.shop.basket.items[hit].quantity += data.quantity;
            }

            EventBus.$emit('update-basket');

        });
        EventBus.$on('update-basket', () => {
            
            let self = this;
            let total = 0;
            let ctx = this.shop.basket;

            ctx.items.forEach(item => {
                let lineprice = parseFloat(item.productSalesPrices.find(x => x.currency == self.shop.settings.currency).tagPrice * item.quantity).toFixed(2);
                total += Number(lineprice);
            });

            let subtotal = parseFloat(total - parseFloat(total * this.shop.settings.vat)).toFixed(2);
            this.shop.basket.subtotal = Number(subtotal);
            this.shop.basket.total = total;

            this.$cookie.set('ave-activebasket', JSON.stringify(this.shop.basket), 1);

        });
        EventBus.$on('currency-change', value => {

            this.shop.settings.currency = value;
            EventBus.$emit('update-basket');

        }); 
    },
    data: {
        viewbag: {
            title: null,
            subtitle: null,
            breadcrumbs: null
        },
        shop: {
            customer: {
                isCustomerLoggedIn: false,
                customerId: null,
                customerName: null
            },
            basket: {
                items: [],
                total: 0,
                subtotal: 0
            },
            favourites: [],
            settings: {
                vat: 0.2,
                currency: "eur",
                logo: "/assets/images/site-logo.svg",
                deliveryandreturns: "<h3>Delivery</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin erat eleifend, iaculis ipsum quis, dignissim enim. Nullam in cursus sapien, quis rutrum ipsum. Phasellus pharetra semper odio, vitae varius justo condimentum vitae. Nam quis dolor bibendum, auctor purus et, sagittis odio. Mauris turpis dui, condimentum a massa vitae, consequat pellentesque risus.</p><h3>Returns</h3><p>Vivamus non porttitor risus, non luctus lacus. Maecenas vel congue odio. Maecenas quis suscipit mi, fringilla accumsan dolor. Vestibulum porttitor ullamcorper ultricies. Praesent felis leo, posuere a pulvinar et, consectetur molestie odio.</p>"
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

                        if(element.hasOwnProperty("children") === false) {
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
                                component: ProductListView,
                            });
                            Routes.push({
                                path: path + element.slug + "/(.*-)?:product(\\d+)",
                                component: ProductInfoView,
                                meta: {
                                    breadcrumbs: Breadcrumbs
                                }
                            });
                        } else {
                            ParseTree(
                                element.children,
                                path + element.slug + "/",
                                Breadcrumbs
                            );
                        }
                    });
                }

                ParseTree(response.data.children, response.data.root, []);
                Routes.push({
                    name: 'Not found',
                    path: '*',
                    meta: {
                        'title': 'Oops.. something went wrong',
                        'subtitle': 'Page not found'
                    },
                    component: NotFoundView
                });

                this.$router.addRoutes(Routes);

            });
        }
    }
});

router.beforeEach((to, from, next) => {
    
    router.app._data.viewbag = {
        title: to.meta.title,
        subtitle: to.meta.subtitle,
        breadcrumbs: to.meta.breadcrumbs
    }

    next();

    window.scrollTo(0, 0);
    
    EventBus.$emit('viewbag-change');

});