<template>  
    <section class="top-infobar__mini-basket">
        <span class="mini-basket__link" @click="open = !open">
            <i class="link__icon fa fa-shopping-cart"></i>
            <span class="link__label" v-if="basket.items.length > 0">{{ currencySymbol }} {{ basket.total }} {{ '(' + basket.items.length + ')' }}</span>
            <span class="link__label" v-else>empty</span>
        </span>
        <div v-if="basket.items.length > 0 && open" class="mini-basket__dropdown">
            <div class="mini-basket__content">
                <article v-for="(line, index) in basket.items" class="mini-basket__line">    
                    <span class="line__image"><img :src="line.productVariantImage" /></span>
                    <span class="line__desc">{{ line.size + ' ' + line.productName  }}</span>
                    <span class="line__qty">{{ line.quantity }}</span>
                    <span class="line__total">{{ line.lineprice }}</span>
                    <span class="line__remove" @click="removeLine(index, line)"><i class="fa fa-times"></i></span>
                </article>
            </div>
            <div class="mini-basket__footer">
                <button @click.prevent="emptyBasket()" class="btn btn--default footer__empty-basket">Empty</button>
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
            emptyBasket() {
                EventBus.$emit('basket-empty');
            },
            removeLine(index, line) {
                EventBus.$emit('basket-empty', {id: index, line: line});
            }, 
            formatBasket() {
                let currency = this.$root.shop.settings.currency;
                let lines = this.basket.items;
                this.basket.items = lines;
            }
        }
    }

</script>