<template>
  <div id="app" class="application">

    <info-top/>

    <page-header/>

    <main class="site-content">
      <router-view/>
    </main>

    <page-footer/>

    <info-bottom/>

  </div>
</template>

<script>

  export default {
    components: {
      'page-header' : () => import('@/components/layout/layout.header.vue'),
      'page-footer' : () => import('@/components/layout/layout.footer.vue'),
      'info-top'    : () => import('@/components/layout/layout.infobar.top.vue'),
      'info-bottom' : () => import('@/components/layout/layout.infobar.bottom.vue')
    }
  }

</script>