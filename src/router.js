import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    {
      path: '/',
      name: 'homepage',
      component: () => import('@/views/view.homepage.vue')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/views/view.sign-up.vue')
    },
    {
      path: '/product/:id',
      name: 'product-details',
      component: () => import('@/views/view.product-details.vue')
    },
    {
      path: '/list',
      name: 'product-list',
      component: () => import('@/views/view.product-list.vue')
    },
    {
      path: '/brand',
      name: 'brand',
      component: () => import('@/views/view.brand.vue')
    },
    {
      path: '/stores',
      name: 'stores',
      component: () => import('@/views/view.store-list.vue')
    },
    { 
      path: '/stores/:id',
      name: 'store-details',
      component: () => import('@/views/view.store-details.vue')
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: () => import('@/views/view.not-found.vue')
    },
    {
      path: '*',
      redirect: '/not-found'
    }
  
  ]
});