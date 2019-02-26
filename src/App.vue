<template>
  <div id="app" class="application">

    <info-top/>

    <page-navigation/>  

    <mobile-navigation/>

    <page-header/>

    <section role="main" class="site-content">
      <router-view/>
    </section>

    <page-footer/>

    <info-bottom/>

  </div>
</template>

<script>
    export default {
        components: {
            'page-header' : () => import('@/components/layout/layout.header.vue'),
            'page-footer' : () => import('@/components/layout/layout.footer.vue'),
            'page-navigation' : () => import('@/components/layout/layout.navigation.vue'),
            'mobile-navigation' : () => import('@/components/layout/layout.mobile-navigation.vue'),
            'info-top'    : () => import('@/components/layout/layout.infobar.top.vue'),
            'info-bottom' : () => import('@/components/layout/layout.infobar.bottom.vue')
        }
    }
</script>