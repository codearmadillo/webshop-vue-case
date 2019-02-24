<template>  
    <section class="top-infobar__mini-basket">
        <span class="mini-basket__link" @click="open = !open">
            <i class="link__icon fa fa-shopping-cart"></i>
            <span class="link__label" v-if="basket.items.length > 0">{{ currencySymbol }} {{ basket.total }} {{ '(' + basket.items.length + ')' }}</span>
            <span class="link__label" v-else>empty</span>
        </span>
        <div v-if="basket.items.length > 0 && open" class="mini-basket__dropdown">
            <div class="mini-basket__content">
                <article v-for="line in basket.items" class="mini-basket__line">    
                    <span class="line__image"><router-link :to="line.url" tag="a"><img :src="line.productVariantImage" /></router-link></span>
                    <span class="line__desc"><router-link :to="line.url" tag="a">{{ line.size + ' ' + line.productName  }}</router-link></span>
                    <span class="line__qty">{{ line.quantity }}</span>
                    <span class="line__total">{{ line.lineprice }}</span>
                </article>
            </div>
            <div class="mini-basket__footer">
                <router-link to="/not-found" tag="a" class="btn btn--action">Go to checkout</router-link>
            </div>
        </div>
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
            this.formatBasket();

            EventBus.$on('currency-change', () => {
                this.currencySymbol = this.$root.currencies[this.$root.shop.settings.currency].symbol;
                this.formatBasket();
            });
            EventBus.$on('update-basket', () => {
                this.basket = this.$root.shop.basket;
                this.formatBasket();
            });
        },
        methods: {
            formatBasket() {
                let currency = this.$root.shop.settings.currency;
                let lines = this.basket.items;
                this.basket.items = lines;
            }
        }
    }

</script>