<template>  
    <section class="top-infobar infobar">
        <div class="shop-content infobar__grid infobar--desktop">
            <span class="grid--text-left">
                <currency-selector/>
            </span>
            <span class="grid--text-right">
                <user-section/>
                <mini-basket/>
            </span>
        </div>
        <div class="shop-content infobar--mobile">
            <router-link to="/" tag="a" class="infobar__site-logo">
                <img :src="sitelogo" />
            </router-link>
        </div>
    </section>
</template>

<script>

    export default {
        components: {
            'currency-selector' : () => import('@/components/elements/element.currency-selector.vue'),
            'user-section' : () => import('@/components/elements/element.user-section.vue'),
            'mini-basket' : () => import('@/components/elements/element.mini-basket.vue')
        },
        computed: {
            sitelogo() {
                return this.$root.$data.shop.settings.logo;
            }
        }
    }

</script>   