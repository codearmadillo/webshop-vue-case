<template>  
    <section class="top-infobar__mini-basket">
        <span class="mini-basket__link" @click="open = !open">
            <i class="link__icon fa fa-shopping-cart"></i>
            <span class="link__label" v-if="basketSize > 0">{{ currencySymbol }} {{ this.$root.settings.basket.total }} {{ '(' + basketSize + ')' }}</span>
            <span class="link__label" v-else>empty</span>
        </span>
    </section>
</template>

<script>

    export default {
        data() {
            return {
                open: false
            }
        },
        computed: {
            currencySymbol() {
                return this.$root.currencies[this.$root.settings.shop.currency].symbol;
            },
            basketSize() {
                return this.$root.settings.basket.items.length;
            }
        }
    }

</script>