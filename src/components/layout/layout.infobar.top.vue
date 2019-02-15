<template>  
    <section class="top-infobar infobar">
        <div class="shop-content">
            <span class="info__left">

                <currency-selector/>

            </span>
            <span class="info__right">
                
                <user-section/>
                <mini-basket/>

            </span>
        </div>
    </section>
</template>

<script>

    export default {
        components: {
            'currency-selector' : () => import('@/components/elements/element.currency-selector.vue'),
            'user-section' : () => import('@/components/elements/element.user-section.vue'),
            'mini-basket' : () => import('@/components/elements/element.mini-basket.vue')
        }
    }

</script>   