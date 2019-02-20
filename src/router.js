import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/demo/product',
      name: 'Demo product',
      component: () => import('@/views/view.product-details.vue')
    },
    {
      path: '/',
      name: 'homepage',
      component: () => import('@/views/view.homepage.vue'),
      meta: {
        title: 'Homepage',
        metaTags: [
          {
            name: 'description',
            content: ''
          },
          {
            name: 'og:description',
            content: ''
          }
        ]
      }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/views/view.sign-up.vue'),
      meta: {
        title: 'Welcome to AVE',
        subtitle: 'Sign in or register',
        metaTags: [
          {
            name: 'description',
            content: ''
          },
          {
            name: 'og:description',
            content: ''
          }
        ]
      }
    },
    {
      path: '/search/:query',
      name: 'search',
      component : () => import('@/views/view.search.vue'),
      meta: {
        title: null,
        subtitle: 'Your search results',
        metaTags: [
          {
            name: 'description',
            content: ''
          },
          {
            name: 'og:description',
            content: ''
          }
        ]
      }
    },
    {
      path: '/brand',
      name: 'brand',
      component: () => import('@/views/view.brand.vue'),
      meta: {
        title: 'The brand',
        subtitle: 'Company slogan goes here',
        metaTags: [
          {
            name: 'description',
            content: ''
          },
          {
            name: 'og:description',
            content: ''
          }
        ]
      }
    },
    {
      path: '/stores',
      name: 'stores',
      component: () => import('@/views/view.store-list.vue'),
      meta: {
        title: 'Our stores',
        subtitle: 'And some subtitle',
        metaTags: [
          {
            name: 'description',
            content: ''
          },
          {
            name: 'og:description',
            content: ''
          }
        ]
      }
    }
  
  ]
});