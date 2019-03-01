import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const PageRouter = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/not-found',
            name: '404',
            component: () => import("@/views/view.not-found.vue"),
            meta: {
                page: {
                    title: 'Oops!.. Something went wrong',
                    subtitle: 'It seems the page you are looking for has not been found.',
                },
                pageMetaTags: [
                    {
                        type: 'og:description',
                        content: '404 - Page not found'
                    },
                    {
                        type: 'og:title',
                        content: '404 - Page not found'
                    },
                    {
                        type: 'title',
                        content: '404 - Page not found',
                    },
                    {
                        type: 'description',
                        content: '404 - Page not found'
                    }
                ]
            }
        },
        {
            path: "/",
            name: "homepage",
            component: () => import("@/views/view.homepage.vue"),
            meta: {
                page: {
                    title: 'Welcome',
                    subtitle: 'Avenue Fashion Welcomes You',
                },
                pageMetaTags: [
                    {
                        type: 'og:description',
                        content: 'default'
                    },
                    {
                        type: 'og:title',
                        content: 'Welcome'
                    },
                    {
                        type: 'title',
                        content: 'Welcome',
                    },
                    {
                        type: 'description',
                        content: 'default'
                    }
                ]
            }
        },
        {
            path: "/sign-up",
            name: "sign-up",
            component: () => import("@/views/view.sign-up.vue"),
            meta: {
                page: {
                    title: 'Welcome to AVE',
                    subtitle: 'Sign in or register',
                },
                pageMetaTags: [
                    {
                        type: 'og:description',
                        content: 'default'
                    },
                    {
                        type: 'og:title',
                        content: 'Sign In or Register Now!'
                    },
                    {
                        type: 'title',
                        content: 'Sign In or Register Now!',
                    },
                    {
                        type: 'description',
                        content: 'default'
                    }
                ]
            }
        },
        {
            path: "/search/:query",
            name: "search",
            component: () => import("@/views/view.search.vue"),
            meta: {

                page: {
                    title: '',
                    subtitle: 'Your search results',
                },
                pageMetaTags: [
                    {
                        type: 'og:description',
                        content: 'default'
                    },
                    {
                        type: 'og:title',
                        content: 'Search Results'
                    },
                    {
                        type: 'title',
                        content: 'Search Results',
                    },
                    {
                        type: 'description',
                        content: 'default'
                    }
                ],

                title: null,
                subtitle: "Your search results",
                metaTags: [
                    {
                        name: "description",
                        content: ""
                    },
                    {
                        name: "og:description",
                        content: ""
                    }
                ]
            }
        },
        {
            path: "/brand",
            name: "brand",
            component: () => import("@/views/view.brand.vue"),
            meta: {
                page: {
                    title: 'About Avenue Fashion',
                    subtitle: 'We dress you up like a movie star',
                },
                pageMetaTags: [
                    {
                        type: 'og:description',
                        content: 'We are Avenue Fashion, the hottest online brand bringing you the best in fashion and accessories from around the world.'
                    },
                    {
                        type: 'og:title',
                        content: 'About Us'
                    },
                    {
                        type: 'title',
                        content: 'About Us',
                    },
                    {
                        type: 'description',
                        content: 'We are Avenue Fashion, the hottest online brand bringing you the best in fashion and accessories from around the world.'
                    }
                ]
            }
        },
        {
            path: "/local-stores",
            name: "local-stores",
            component: () => import("@/views/view.local-stores.vue"),
            meta: {
                page: {
                    title: 'Local Stores',
                    subtitle: 'Find a store near you',
                },
                pageMetaTags: [
                    {
                        type: 'og:description',
                        content: 'Find a store near you'
                    },
                    {
                        type: 'og:title',
                        content: 'Local Stores'
                    },
                    {
                        type: 'title',
                        content: 'Local Stores',
                    },
                    {
                        type: 'description',
                        content: 'Find a store near you'
                    }
                ]
            },
            children: [
                {
                    path: "london",
                    name: "local-store-london",
                    components: {
                        'store-detail': () => import('@/views/view.local-stores-detail.vue')
                    },
                    meta: {
                        page: {
                            title: 'AVE London',
                            subtitle: 'Find a store near you',
                        },
                        pageMetaTags: [
                            {
                                type: 'og:description',
                                content: 'Find a store near you'
                            },
                            {
                                type: 'og:title',
                                content: 'London'
                            },
                            {
                                type: 'title',
                                content: 'London',
                            },
                            {
                                type: 'description',
                                content: 'Find a store near you'
                            }
                        ],
                        locationTitle: "London",
                        locationAddress: "180-182 Regent Street, London, W1B 5BT",
                        locationDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing esi elit. Vivamus at arcu sem. Vestibulum ornare eleifendit massa, nec tempor odio. Fusce posuere nunc iaculis ligula viverra iaculis. Aliquam erat volutpat.",
                        locationContact: [
                            {
                                icon: 'fa fa-map-marker-alt',
                                content: '180-182 Regent Street, London, W1B 5BT',
                                isLink: false
                            },
                            {
                                icon: 'fa fa-phone',
                                content: '0123-456-789',
                                isLink: true,
                                linkTo: 'tel:0123-456-789',
                            },
                            {
                                icon: 'fa fa-link',
                                content: 'www.yourwebsite.com',
                                isLink: true,
                                linkTo: 'https://www.yourwebsite.com',
                            },
                            {
                                icon: 'fa fa-envelope',
                                content: 'support@yourwebsite.com',
                                isLink: true,
                                linkTo: 'mailto:support-london@yourwebsite.com',
                            }   
                        ],
                        locationOpeningHours: "Monday-Friday: 9am to 6pm  Saturday: 10am to 6pm  Sunday: 10am to 2pm",
                        locationSocialMedia: [
                            {
                                icon: 'fab fa-facebook-f',
                                title: 'Facebook',
                                url: 'https://www.facebook.com/ave-page-london'
                            },
                            {
                                icon: 'fab fa-twitter',
                                title: 'Twitter',
                                url: 'https://www.twitter.com/ave-page-london'
                            },
                            {
                                icon: 'fab fa-instagram',
                                title: 'Instagram',
                                url: 'https://www.instagram.com/ave-page-london'
                            },
                            {
                                icon: 'fab fa-pinterest',
                                title: 'Pinterest',
                                url: 'https://www.pinterest.com/ave-page-london'
                            },
                        ]
                    }
                },
                {
                    path: "new-york",
                    name: "local-store-new-york",
                    components: {
                        'store-detail': () => import('@/views/view.local-stores-detail.vue')
                    },
                    meta: {

                        page: {
                            title: 'AVE New York',
                            subtitle: 'Find a store near you',
                        },
                        pageMetaTags: [
                            {
                                type: 'og:description',
                                content: 'Find a store near you'
                            },
                            {
                                type: 'og:title',
                                content: 'New York'
                            },
                            {
                                type: 'title',
                                content: 'New York',
                            },
                            {
                                type: 'description',
                                content: 'Find a store near you'
                            }
                        ],

                        title: "Local stores",
                        subtitle: "Find a store near you",
                        locationTitle: "New York",
                        locationAddress: "109 Columbus Circle, New York, NY 10023",
                        locationDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing esi elit. Vivamus at arcu sem. Vestibulum ornare eleifendit massa, nec tempor odio. Fusce posuere nunc iaculis ligula viverra iaculis. Aliquam erat volutpat.",
                        locationOpeningHours: "Monday-Friday: 9am to 6pm  Saturday: 10am to 6pm  Sunday: 10am to 2pm",
                        locationContact: [
                            {
                                icon: 'fa fa-map-marker-alt',
                                content: '109 Columbus Circle, New York, NY 10023',
                                isLink: false
                            },
                            {
                                icon: 'fa fa-phone',
                                content: '0123-456-789',
                                isLink: true,
                                linkTo: 'tel:0123-456-789',
                            },
                            {
                                icon: 'fa fa-link',
                                content: 'www.yourwebsite.com',
                                isLink: true,
                                linkTo: 'https://www.yourwebsite.com',
                            },
                            {
                                icon: 'fa fa-envelope',
                                content: 'support@yourwebsite.com',
                                isLink: true,
                                linkTo: 'mailto:support-newyork@yourwebsite.com',
                            }   
                        ],
                        locationSocialMedia: [
                            {
                                icon: 'fab fa-facebook-f',
                                title: 'Facebook',
                                url: 'https://www.facebook.com/ave-page-newyork'
                            },
                            {
                                icon: 'fab fa-twitter',
                                title: 'Twitter',
                                url: 'https://www.twitter.com/ave-page-newyork'
                            },
                            {
                                icon: 'fab fa-instagram',
                                title: 'Instagram',
                                url: 'https://www.instagram.com/ave-page-newyork'
                            },
                            {
                                icon: 'fab fa-pinterest',
                                title: 'Pinterest',
                                url: 'https://www.pinterest.com/ave-page-newyork'
                            },
                        ]
                    }
                },
                {
                    path: "local-store-paris",
                    name: "local-store-paris",
                    components: {
                        'store-detail': () => import('@/views/view.local-stores-detail.vue')
                    },
                    meta: {

                        page: {
                            title: 'AVE Paris',
                            subtitle: 'Find a store near you',
                        },
                        pageMetaTags: [
                            {
                                type: 'og:description',
                                content: 'Find a store near you'
                            },
                            {
                                type: 'og:title',
                                content: 'Paris'
                            },
                            {
                                type: 'title',
                                content: 'Paris',
                            },
                            {
                                type: 'description',
                                content: 'Find a store near you'
                            }
                        ],

                        title: "Local stores",
                        subtitle: "Find a store near you",
                        locationTitle: "Paris",
                        locationAddress: "2133 Rue Saint-Honoré, 75001 Paris",
                        locationDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing esi elit. Vivamus at arcu sem. Vestibulum ornare eleifendit massa, nec tempor odio. Fusce posuere nunc iaculis ligula viverra iaculis. Aliquam erat volutpat.",
                        locationContact: [
                            {
                                icon: 'fa fa-map-marker-alt',
                                content: '2133 Rue Saint-Honoré, 75001 Paris',
                                isLink: false
                            },
                            {
                                icon: 'fa fa-phone',
                                content: '0123-456-789',
                                isLink: true,
                                linkTo: 'tel:0123-456-789',
                            },
                            {
                                icon: 'fa fa-link',
                                content: 'www.yourwebsite.com',
                                isLink: true,
                                linkTo: 'https://www.yourwebsite.com',
                            },
                            {
                                icon: 'fa fa-envelope',
                                content: 'support@yourwebsite.com',
                                isLink: true,
                                linkTo: 'mailto:support-paris@yourwebsite.com',
                            }   
                        ],
                        locationOpeningHours: "Monday-Friday: 9am to 6pm  Saturday: 10am to 6pm  Sunday: 10am to 2pm",
                        locationSocialMedia: [
                            {
                                icon: 'fab fa-facebook-f',
                                title: 'Facebook',
                                url: 'https://www.facebook.com/ave-page-paris'
                            },
                            {
                                icon: 'fab fa-twitter',
                                title: 'Twitter',
                                url: 'https://www.twitter.com/ave-page-paris'
                            },
                            {
                                icon: 'fab fa-instagram',
                                title: 'Instagram',
                                url: 'https://www.instagram.com/ave-page-paris'
                            },
                            {
                                icon: 'fab fa-pinterest',
                                title: 'Pinterest',
                                url: 'https://www.pinterest.com/ave-page-paris'
                            },
                        ]
                    }
                }
            ]
        },
    ]
});

export default PageRouter;