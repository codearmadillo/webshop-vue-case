<template>
    <div class="shop-content product-list__wrapper"> 
        <product productid="623651" />
        <product productid="786780" />
        <product productid="455448" />
        <product productid="536767" />
        <product productid="876764" />
        <product productid="435454" />
        <product productid="546542" />
    </div>
</template>

<script>

    export default {
        components: {
            'product': () => import("@/components/elements/element.product.vue")
        }
    }

</script>
