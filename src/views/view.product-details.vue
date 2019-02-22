<template>
    <div v-if="fetched" class="shop-content product-details__wrapper">
        <section class="product-details__images">
            <img style="display: none" src="https://www.na-kd.com/globalassets/nakd_basic_sweater_1044-000019-0115_01a_r1.jpg?maxheight=3200&mode=max&ref=B7506A992D&width=2560" />
        </section>
        <section class="product-details__page-controls">
            <header>
                <h2 class="product__name">{{ product.productName }}</h2>
            </header>
            <section class="product__rating">
                <span class="rating__section rating__current">
                    <i class="fa fa-star rating__icon rating__icon--filled"></i>
                    <i class="fa fa-star rating__icon rating__icon--filled"></i>
                    <i class="fa fa-star rating__icon rating__icon--filled"></i>
                    <i class="fa fa-star rating__icon"></i>
                    <i class="fa fa-star rating__icon"></i>
                    <span class="rating__reviews-count">3 Review(s)</span>
                </span>
                <span class="rating__section rating__add">
                    <span class="add__label">Add a Review</span>   
                </span>
                <span class="rating__section rating__share">
                    <span class="share__label">Share:</span>
                    <a class="share__link" :href="'https://www.facebook.com/sharer/sharer.php?u=' + shareurl" title="Facebook">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a class="share__link" :href="'https://twitter.com/home?status=' + shareurl" title="Twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a class="share__link" :href="'https://plus.google.com/share?url=' + shareurl" title="Google+">
                        <i class="fab fa-google-plus-g"></i>
                    </a>
                    <a class="share__link" :href="'https://pinterest.com/pin/create/button/?url=' + shareurl + '&media=Image' + ''" title="Pinterest">
                        <i class="fab fa-pinterest-p"></i>
                    </a>
                </span>
            </section>
            <section class="product__prices" v-if="currentSalesPrice">
                <template v-if="currentSalesPrice.hasPreviousPrice">
                    <span class="price__previous price--gbp"><span class="price__currency">{{ currentSalesPriceSymbol }}</span>{{ currentSalesPrice.previousPrice }}</span>
                </template>
                <span class="price__current price--gbp"><span class="price__currency">{{ currentSalesPriceSymbol }}</span>{{ currentSalesPrice.tagPriceFormatted }}</span>
            </section>
            <section class="product__meta">
                <span class="product-meta__field meta--availability">
                    <span class="meta__label">Availability:</span>
                    <span class="meta__value">
                        <template v-if="configuratorAvailability !== null">
                            <template v-if="configuratorAvailability == false">
                                Out of stock
                            </template>
                            <template v-else>
                                In stock
                            </template>
                        </template>
                        <template v-else>
                            Select colour variant and size
                        </template> 
                    </span>
                </span>
                <span class="product-meta__field meta--product-code">
                    <span class="meta__label">Product code:</span>
                    <span class="meta__value">{{ product.productCode }}</span>
                </span>
                <span class="product-meta__field meta--tags" v-if="product.productTags.length > 0">
                    <span class="meta__label">Tags:</span>
                    <span class="meta__value">
                        <router-link
                            v-for="tag in product.productTags"
                            :title="tag"
                            :to="`/products/tag/${encodeURIComponent(tag)}`"
                            tag="a"
                            class="meta__tag">{{ tag }}</router-link>
                    </span>
                </span>
            </section>
            <section class="product__information">
                <p class="product__short-description">{{ product.productShortDesc }}</p>
                <ul v-if="product.productSpecs.length > 0" class="product__props">
                    <li v-for="spec in product.productSpecs">{{ spec }}</li>
                    <li v-if="product.productHasFreeShipping">Free shipping with 4 days delivery</li>
                </ul>
            </section>
            <section class="product__configurator">
                <v-input
                    v-model="userinput.colour"
                    elementName="colour"
                    elementType="select"
                    elementLabel="Colour"
                    elementClassname="configurator__colour"
                    :options="configuratorColourOptions"
                    :isRequired="true"
                    @input="configuratorSelectColour"
                />
                <v-input
                    v-model="userinput.size"
                    elementName="size"
                    elementType="select"
                    elementLabel="Size"
                    elementClassname="configurator__size"
                    :options="configuratorAvailableSizes"
                    :isRequired="true"
                    ref="sizeselector"
                />
                <v-input
                    v-model="userinput.qty"
                    elementType="number"
                    elementName="quantity"
                    elementLabel="Qty"
                    elementClassname="configurator__qty"
                    elementPlaceholder="1"
                    elementPresetValue="1"
                    :isRequired="true"
                    @submit="addToBasket()" 
                />  
            </section>
            <section class="product__submission">
                <button class="btn btn--default" @click.prevent="addToBasket()">
                    <i class="fa fa-shopping-cart"></i> Add to cart
                </button>
                <button class="btn btn--default" @click.prevent="addToLookbook()">
                    <i class="fa fa-heart"></i> Add to lookbook
                </button>
            </section>
        </section>
        <section class="product-details__product-information">
            <header class="information__navigation">
                <ul class="information__tabs">
                    <li class="information__tab active" @click="changeSection('description')">
                        <i class="fa fa-info tab__icon"></i>
                        <span class="tab__label">Description</span>
                    </li>
                    <li class="information__tab" @click="changeSection('video')">
                        <i class="fa fa-video tab__icon"></i>
                        <span class="tab__label">Video</span>
                    </li>
                    <li class="information__tab" @click="changeSection('size-and-specs')">
                        <i class="fa fa-clipboard-list tab__icon"></i>
                        <span class="tab__label">Size &amp; Specs</span>
                    </li>
                    <li class="information__tab" @click="changeSection('delivery-and-returns')">
                        <i class="fa fa-gift tab__icon"></i>
                        <span class="tab__label">Delivery &amp; Returns</span>
                    </li>
                    <li class="information__tab" @click="changeSection('reviews')">
                        <i class="fa fa-pencil-alt tab__icon"></i>
                        <span class="tab__label">Reviews</span>
                    </li> 
                </ul>
            </header>
            <section class="information__content">

            </section>
        </section>
    </div>
    <div v-else class="product__loader">
        <i class="fa fa-spinner fa-spin"></i>
    </div>
</template>

<script>

    import { EventBus } from "@/event-bus";
    import axios from "axios";

    export default {
        components: {
            'v-form': () => import('@/components/entities/entity.form.vue'),
            'v-input': () => import('@/components/entities/entity.input.vue')
        },
        data() {
            return {
                fetched: false,
                product: null,
                userinput: {
                    size: null,
                    colour: null,
                    qty: null
                },
                currentSalesPrice: null,
                currentSalesPriceSymbol: null,
                
                configuratorSelectedVariant: null,
                configuratorAvailableSizes: null,

                selectedVariantImages: null,

                shareurl: window.location.href
            }
        },
        methods: {
            /*
            Get / Set
            */
            get(id) {
                return axios.get('/data/data.demo-product.json');   
            },
            set(d) {
                this.product = d;
            },
            

            /*
            Postbacks
            */
            addToBasket() {
                if(this.configuratorAvailability) {
                    if(this.userinput.qty.value > 0) {
                        EventBus.$emit('add-to-basket', {
                            basketMatrix: this.product.productId + '-' + this.configuratorSelectedVariant.variantColor + '-' + this.configuratorAvailableSizes[this.userinput.size.value + 1].value,
                            productId: this.product.productId,
                            productName: this.product.productName,
                            productVariant: this.configuratorSelectedVariant.variantColor,
                            productVariantImage: this.configuratorSelectedVariant.variantImages[0],
                            productSalesPrices: this.product.productSalesPrices,
                            quantity: this.userinput.qty.value,
                            size: this.configuratorAvailableSizes[this.userinput.size.value + 1].value
                        });
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            },
            addToLookbook() {
                console.log('Adding to lookbook');
            },
            selectTab(sectionId) {
                this.selectedTab = sectionId;
            },
            

            changeCurrentSalesPrice(currency) {
                let salesPrices = this.product.productSalesPrices;
                if(salesPrices.length === 0) {
                    this.currentSalesPrice = null;
                } else {
                    let sorted = salesPrices.filter(x => x.currency == currency);
                    if(sorted.length === 0) {
                        this.currentSalesPrice = salesPrices[0];
                    } else {
                        this.currentSalesPrice = sorted[0];
                    }
                }
                this.currentSalesPriceSymbol = this.$root.$data.currencies[currency].symbol;
            },
            configuratorSelectColour(event) {

                this.configuratorSelectedVariant = this.product.productVariants[this.userinput.colour.value];

                /* Sizes */
                this.$refs.sizeselector.Reset();
                this.configuratorAvailableSizes = this.configuratorLoadSizes(this.configuratorSelectedVariant);
                
            },
            configuratorLoadSizes(variant) {

                let Placeholder = [{
                    key: null,
                    value: 'Select Size',
                    selected: true,
                    disabled: true
                }];
                if(variant) {
                    let sizes = variant.variantSizes.map((v, i) => {
                        return {
                            key: i,
                            value: v
                        }
                    }); 
                    Placeholder = Placeholder.concat(sizes);
                }

                return Placeholder;
            }
        },
        computed: {
            configuratorColourOptions() {
                let options = this.product.productVariants.map((variant, index) => {
                    return {
                        key: index,
                        value: variant.variantColor.charAt(0).toUpperCase() + variant.variantColor.slice(1)
                    }
                });
                options.unshift({
                    key: null,
                    value: 'Select colour',
                    disabled: true,
                    selected: true
                });
                return options;
            },
            configuratorAvailability() {

                if(!this.configuratorSelectedVariant || this.userinput.size.value == null) {
                    return null;
                }

                return this.configuratorSelectedVariant.variantStockMatrix[this.userinput.size.value] > 0;
            }
        },
        mounted() {

            let self = this;
            EventBus.$on('currency-change', currency => {
                self.changeCurrentSalesPrice(currency);
            });
            this.configuratorAvailableSizes = this.configuratorLoadSizes(false);

        },  
        async created() {

            const data = this.get(0).then(response => {
                if(response.status !== 200) {
                    this.$router.push({path: '/not-found'});
                } else {
                    this.fetched = true;
                    this.product = response.data;
                    this.selectedVariantImages = this.product.productVariants[0].variantImages;
                }
            });

        }
    }
</script>
