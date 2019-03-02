import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueCookie from 'vue-cookie';
import { EventBus } from './event-bus';

import * as VueGoogleMaps from 'vue2-google-maps'

import ProductListView from "./views/view.product-list.vue";
import ProductInfoView from "./views/view.product-details.vue";
import NotFoundView from "./views/view.not-found.vue";

Vue.use(VueCookie);  
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCZft9sNsKMXzoMMurNQ-zwrq2W8H7qDc4',
        libraries: 'places'
    }
});
Vue.config.productionTip = false;

const Application = new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App),
    beforeMount() {
        /* Cookies */
        let cookieBasket = this.$cookie.get('ave-activebasket');
        if(cookieBasket !== null) {
            this.shop.basket = JSON.parse(cookieBasket);
        }
    },
    mounted() {
        this.fetchAndRouteCategories();
    },
    created() {

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
        EventBus.$on('basket-empty', res => {

            let ctx = this.shop.basket.items;

            if(res) {
                if(ctx[res.id]) {
                    ctx.splice(res.id, 1);
                }
            } else {
                this.shop.basket.items = [];
            }

            EventBus.$emit('open-popup', {
                msg: `Your basket has been updated`
            });
            EventBus.$emit('update-basket');

        });
        EventBus.$on('currency-change', value => {

            this.shop.settings.currency = value;
            EventBus.$emit('update-basket');

        }); 

        EventBus.$on('header-request', () => {
            this.fetchMeta(this.$route);
        });

    },
    data: {
        viewbag: {

            page: {
                title: null,
                subtitle: null,
                breadcrumbs: null
            },

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
                deliveryandreturns: "<h3>Delivery</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin erat eleifend, iaculis ipsum quis, dignissim enim. Nullam in cursus sapien, quis rutrum ipsum. Phasellus pharetra semper odio, vitae varius justo condimentum vitae. Nam quis dolor bibendum, auctor purus et, sagittis odio. Mauris turpis dui, condimentum a massa vitae, consequat pellentesque risus.</p><h3>Returns</h3><p>Vivamus non porttitor risus, non luctus lacus. Maecenas vel congue odio. Maecenas quis suscipit mi, fringilla accumsan dolor. Vestibulum porttitor ullamcorper ultricies. Praesent felis leo, posuere a pulvinar et, consectetur molestie odio.</p>",
                seo: [
                    {
                        type: 'title',
                        content: 'Avenue Fashion'
                    },
                    {
                        type: 'description',
                        content: 'We are Avenue Fashion, the hottest online brand bringing you the best in fashion and accessories from around the world.'
                    },
                    {
                        type: 'og:title',
                        content: 'Avenue Fashion'
                    },
                    {
                        type: 'og:description',
                        content: 'We are Avenue Fashion, the hottest online brand bringing you the best in fashion and accessories from around the world.'
                    },
                    {
                        type: 'og:image',
                        content: './image.jpg'
                    }
                ]
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
                },
                homepage: {
                    headerbg: '/assets/images/background.homepage.jpg',
                    promotionLinkTitle: 'Shop men\'s collection',
                    promotionLinkUrl: '/products/men/casual/jackets'
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
        fetchMeta(to) {

            if(to === null) {

                return null;

            } else {

                const nearestWithHeaderAttributes = to.matched.slice().reverse().find(x => x.meta && x.meta.page);
                const nearestWithMetaTags = to.matched.slice().reverse().find(x => x.meta && x.meta.pageMetaTags);

                let PageMetaDataspace = [];

                /* Resolve page meta tags */
                if(nearestWithMetaTags) {
                    let Tags = nearestWithMetaTags.meta.pageMetaTags;
                    
                    this.shop.settings.seo.forEach(dTag => {

                        let Match = Tags.find(x => x.type === dTag.type);

                        if(Match && Match.content !== 'default') {
                            PageMetaDataspace.push(Match);
                        } else {
                            PageMetaDataspace.push(dTag);
                        }
                        
                    });
                } else {
                    PageMetaDataspace = this.shop.settings.seo;
                }

                /* Render page meta tags */
                PageMetaDataspace.forEach(metatag => {
                    if(metatag.type === 'title') {
                        document.title = metatag.content + " • Avenue Fashion";
                    } else {

                        Array.from(document.querySelectorAll('[data-vue-router="'+metatag.type+'"]')).map(el => el.parentNode.removeChild(el));

                        let html = document.createElement('meta');
                            html.setAttribute('type', metatag.type);
                            html.setAttribute('content', metatag.content);
                            html.setAttribute('data-vue-router', metatag.type);

                        document.head.appendChild(html);
                    }
                }); 

                /* Resolve page header attributes */
                if(nearestWithHeaderAttributes) {
                    EventBus.$emit('header-resolve', nearestWithHeaderAttributes.meta.page);
                } else {
                    // fallback
                }
                /* Resolve page header attributes */

            }

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

                        if(element.hasOwnProperty("children") === false) {
                            Routes.push({
                                path: path + element.slug,
                                meta: {

                                    page: {
                                        title: element.title,
                                        subtitle: '',
                                        breadcrumbs: Breadcrumbs
                                    },
                                    pageMetaTags: [
                                        {
                                            type: 'og:description',
                                            content: 'See latest products from category ' + element.title
                                        },
                                        {
                                            type: 'og:title',
                                            content: element.title
                                        },
                                        {
                                            type: 'title',
                                            content: element.title
                                        },
                                        {
                                            type: 'description',
                                            content: 'See latest products from category ' + element.title
                                        }
                                    ],

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
                                path: path + element.slug + "/(.*-)?:product(\\d+|\\w+)",
                                component: ProductInfoView,
                                meta: {
                                    type: 'product-view',
                                    page: {
                                        title: 'Product view',
                                        subtitle: '',
                                        breadcrumbs: Breadcrumbs
                                    },
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
                    path: '*',
                    redirect: '/not-found'
                });

                this.$router.addRoutes(Routes);

            }).then(() => {

                this.fetchMeta(this.$route);

            });
        }
    }
});

router.beforeEach((to, from, next) => {

    next();
    window.scrollTo(0, 0);

});

router.afterEach((to, from) => {

    EventBus.$emit('offcanvas-close');
    router.app.fetchMeta(to);

});