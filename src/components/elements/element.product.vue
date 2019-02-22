<template>
    <article class="product__instance">
        <router-link tag="a" :title="data.productName" :to="productUrl">
            <header class="product__price">
                <span class="price--current"><span class="price__currency">{{ currentCurrency }}</span>{{ currentprice }}</span>
            </header>
            <section class="product__image">
                <img :src="productImage" :title="data.productName" :alt="data.productName" />
            </section>
        </router-link>
        <footer class="product__meta">
            <router-link tag="a" :title="data.productName" :to="productUrl">
                <h2 class="product__name">{{ data.productName }}</h2>
            </router-link>
            <router-link tag="a" :title="data.productName" :to="productUrl">
                <p class="product__description">{{ data.productShortDesc }}</p>
            </router-link>
            <div class="product__controls">
                <router-link tag="a" :title="data.productName" :to="productUrl">
                    <span class="product__btn btn--buy"><i class="fa fa-shopping-cart"></i></span>
                </router-link>
                <span class="product__btn btn--add-to-favourites"><i class="fa fa-heart"></i></span>
            </div>
        </footer>
    </article>
</template>

<script>

    import { EventBus } from "@/event-bus";

    export default {
        data() {
            return { 
                currentprice: null
            }
        },
        props: {
            data: {
                required: true,
            }
        },
        computed: {
            productUrl() {
                let url = this.data.productName.split(' ').join('-').toLowerCase() + '-' + this.data.productId;
                return '/product/' + url;
            },
            productImage() {
                let variantImage = this.data.productVariants[0].variantImages[0];

                if(!variantImage) {
                    return this.$root.shop.settings.productDefaultImage;
                } else {
                    return variantImage;
                }
            },
            currentCurrency() {
                return this.$root.currencies[this.$root.shop.settings.currency].symbol;
            }
        },
        methods: {
            changeCurrentSalesPrice(currency) {

                this.currentprice = 0;
                if(!currency) {
                    currency = this.$root.shop.settings.currency;
                }
                this.currentprice = this.data.productSalesPrices.find(x => x.currency === currency).tagPrice;
                
            }
        },
        mounted() {
            let self = this;
            self.changeCurrentSalesPrice();
            EventBus.$on('currency-change', currency => {
                self.changeCurrentSalesPrice(currency);
            });
        }
    }
</script>