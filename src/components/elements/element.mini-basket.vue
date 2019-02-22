<template>  
    <section class="top-infobar__mini-basket">
        <span class="mini-basket__link" @click="open = !open">
            <i class="link__icon fa fa-shopping-cart"></i>
            <span class="link__label" v-if="basket.items.length > 0">{{ currencySymbol }} {{ basket.total }} {{ '(' + basket.items.length + ')' }}</span>
            <span class="link__label" v-else>empty</span>
        </span>
    </section>
</template>

<script>

    import { EventBus } from '@/event-bus';

    export default {
        data() {
            return {
                open: false,
                currencySymbol: '',
                basket: null
            }
        },
        created() {
            this.basket = this.$root.shop.basket;
            this.currencySymbol = this.$root.currencies[this.$root.shop.settings.currency].symbol;   

            EventBus.$on('currency-change', () => {
                this.currencySymbol = this.$root.currencies[this.$root.shop.settings.currency].symbol;
            });
            EventBus.$on('update-basket', () => {
                this.basket = this.$root.shop.basket;
            });
        }
    }

</script>