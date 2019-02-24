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
                    <span @click="addReview()" class="add__label">Add a Review</span>   
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
                    <span class="price__previous price--gbp"><span class="price__currency">{{ currentSalesPriceSymbol }}</span>{{ previousPriceFormatted }}</span>
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
                    <li :class="(selectedTab == 'description' ? 'active ' : '') + 'information__tab'" @click="selectTab('description')">
                        <i class="fa fa-info tab__icon"></i>
                        <span class="tab__label">Description</span>
                    </li>
                    <li :class="(selectedTab == 'video' ? 'active ' : '') + 'information__tab'" @click="selectTab('video')">
                        <i class="fa fa-video tab__icon"></i>
                        <span class="tab__label">Video</span>
                    </li>
                    <li :class="(selectedTab == 'size-and-specs' ? 'active ' : '') + 'information__tab'" @click="selectTab('size-and-specs')">
                        <i class="fa fa-clipboard-list tab__icon"></i>
                        <span class="tab__label">Size &amp; Specs</span>
                    </li>
                    <li :class="(selectedTab == 'delivery-and-returns' ? 'active ' : '') + 'information__tab'" @click="selectTab('delivery-and-returns')">
                        <i class="fa fa-gift tab__icon"></i>
                        <span class="tab__label">Delivery &amp; Returns</span>
                    </li>
                    <li :class="(selectedTab == 'reviews' ? 'active ' : '') + 'information__tab'" @click="selectTab('reviews')">
                        <i class="fa fa-pencil-alt tab__icon"></i>
                        <span class="tab__label">Reviews</span>
                    </li> 
                </ul>
            </header>
            <section class="information__content" id="information">
                <article class="information__content--content" v-if="selectedTab == 'description'">
                    <p>{{ product.productLongDesc }}</p>
                </article>
                <article class="information__content--content" v-if="selectedTab == 'video'">
                    <template v-if="product.productVideos.length > 0">
                        <iframe
                            v-for="video in productVideosParsed"
                            :src="'https://www.youtube.com/embed/' + video"
                            width="560" height="315"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    </template>
                    <template v-else>
                        <p>This product has no videos</p>
                    </template>
                </article>
                <article class="information__content--content" v-if="selectedTab == 'size-and-specs'">
                    <template v-if="">

                    </template>
                    <template v-if="product.productSpecs.length > 0">
                        <h3>Product specifications</h3>
                        <ul v-for="spec in product.productSpecs">
                            <li>{{ spec }}</li>
                        </ul>
                    </template>
                    
                </article>
                <article class="information__content--content" v-if="selectedTab == 'delivery-and-returns'" v-html="this.$root.shop.settings.deliveryandreturns"></article>
                <article class="information__content--reviews" v-if="selectedTab == 'reviews'">
                    <section v-if="isAddReviewActive" class="reviews__add">
                        <v-form
                            formId="product-addreview"
                            formHeader="Add review"
                            :formElements="[
                                {
                                    elementType: 'email',
                                    elementName: 'addreview-email',
                                    elementLabel: 'Your email',
                                    elementPlaceholder: 'Your Email..',
                                    renderLabel: true,
                                    isRequired: true
                                },
                                {
                                    elementType: 'text',
                                    elementName: 'addreview-name',
                                    elementLabel: 'Your name',
                                    elementPlaceholder: 'Your name..',
                                    renderLabel: true,
                                    isRequired: true
                                },
                                {
                                    elementType: 'textarea',
                                    elementName: 'addreview-content',
                                    elementLabel: 'Your review',
                                    elementPlaceholder: 'Your review..',
                                    renderLabel: true,
                                    isRequired: true
                                },
                                {
                                    elementType: 'select',
                                    elementName: 'addreview-rating',
                                    elementLabel: 'Your rating',
                                    options: [
                                        {
                                            key: 1,
                                            value: '1 Star'
                                        },
                                        {
                                            key: 2,
                                            value: '2 Stars'
                                        },
                                        {
                                            key: 3,
                                            value: '3 Stars'
                                        },
                                        {
                                            key: 4,
                                            value: '4 Stars'
                                        },
                                        {
                                            key: 5,
                                            value: '5 Stars'
                                        }
                                    ],
                                    isRequired: true,
                                    renderLabel: true
                                }
                            ]"
                            formButton="Submit"
                            formButtonClass="btn btn--action"
                            @failure="reviewFailure"
                            @success="reviewSuccess"
                        />
                    </section>
                    <section class="reviews__list">
                        <article class="review__instance">
                            <header class="review__header">
                                <h2 class="review__title">This product is amazing!</h2>
                                <span class="review__aggregate aggregate--3">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </span>
                                <h3 class="review__author">By Joshua</h3>
                            </header>
                            <section class="review__body">
                                <p>Lorem ipsum dolor sit amet, <a href="#">consectetur <b>adipiscing elit.</b></a> Nullam maximus nisl sapien, <b>elementum gravida dui</b> consequat non.</p>
                                <p>Fusce mollis facilisis maximus. Nullam a velit sem. Nunc magna nisi, dapibus vitae dui ac, ullamcorper iaculis libero. Mauris in dui ut dui vulputate bibendum. Sed leo nunc, lobortis a rutrum ut, pulvinar ac erat.</p>
                            </section>
                        </article>
                        <article class="review__instance">
                            <header class="review__header">
                                <h2 class="review__title">This product is amazing!</h2>
                                <span class="review__aggregate aggregate--3">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </span>
                                <h3 class="review__author">By Joshua</h3>
                            </header>
                            <section class="review__body">
                                <p>Lorem ipsum dolor sit amet, <a href="#">consectetur <b>adipiscing elit.</b></a> Nullam maximus nisl sapien, <b>elementum gravida dui</b> consequat non.</p>
                                <p>Fusce mollis facilisis maximus. Nullam a velit sem. Nunc magna nisi, dapibus vitae dui ac, ullamcorper iaculis libero. Mauris in dui ut dui vulputate bibendum. Sed leo nunc, lobortis a rutrum ut, pulvinar ac erat.</p>
                            </section>
                        </article>
                        <article class="review__instance">
                            <header class="review__header">
                                <h2 class="review__title">This product is amazing!</h2>
                                <span class="review__aggregate aggregate--4">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </span>
                                <h3 class="review__author">By Joshua</h3>
                            </header>
                            <section class="review__body">
                                <p>Lorem ipsum dolor sit amet, <a href="#">consectetur <b>adipiscing elit.</b></a> Nullam maximus nisl sapien, <b>elementum gravida dui</b> consequat non.</p>
                                <p>Fusce mollis facilisis maximus. Nullam a velit sem. Nunc magna nisi, dapibus vitae dui ac, ullamcorper iaculis libero. Mauris in dui ut dui vulputate bibendum. Sed leo nunc, lobortis a rutrum ut, pulvinar ac erat.</p>
                            </section>
                        </article>
                        <article class="review__instance">
                            <header class="review__header">
                                <h2 class="review__title">This product is amazing!</h2>
                                <span class="review__aggregate aggregate--2">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </span>
                                <h3 class="review__author">By Joshua</h3>
                            </header>
                            <section class="review__body">
                                <p>Lorem ipsum dolor sit amet, <a href="#">consectetur <b>adipiscing elit.</b></a> Nullam maximus nisl sapien, <b>elementum gravida dui</b> consequat non.</p>
                                <p>Fusce mollis facilisis maximus. Nullam a velit sem. Nunc magna nisi, dapibus vitae dui ac, ullamcorper iaculis libero. Mauris in dui ut dui vulputate bibendum. Sed leo nunc, lobortis a rutrum ut, pulvinar ac erat.</p>
                            </section>
                        </article>
                        <article class="review__instance">
                            <header class="review__header">
                                <h2 class="review__title">This product is amazing!</h2>
                                <span class="review__aggregate aggregate--4">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </span>
                                <h3 class="review__author">By Joshua</h3>
                            </header>
                            <section class="review__body">
                                <p>Lorem ipsum dolor sit amet, <a href="#">consectetur <b>adipiscing elit.</b></a> Nullam maximus nisl sapien, <b>elementum gravida dui</b> consequat non.</p>
                                <p>Fusce mollis facilisis maximus. Nullam a velit sem. Nunc magna nisi, dapibus vitae dui ac, ullamcorper iaculis libero. Mauris in dui ut dui vulputate bibendum. Sed leo nunc, lobortis a rutrum ut, pulvinar ac erat.</p>
                            </section>
                        </article>
                        <article class="review__instance">
                            <header class="review__header">
                                <h2 class="review__title">This product is amazing!</h2>
                                <span class="review__aggregate aggregate--3">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </span>
                                <h3 class="review__author">By Joshua</h3>
                            </header>
                            <section class="review__body">
                                <p>Lorem ipsum dolor sit amet, <a href="#">consectetur <b>adipiscing elit.</b></a> Nullam maximus nisl sapien, <b>elementum gravida dui</b> consequat non.</p>
                                <p>Fusce mollis facilisis maximus. Nullam a velit sem. Nunc magna nisi, dapibus vitae dui ac, ullamcorper iaculis libero. Mauris in dui ut dui vulputate bibendum. Sed leo nunc, lobortis a rutrum ut, pulvinar ac erat.</p>
                            </section>
                        </article>
                        <article class="review__instance">
                            <header class="review__header">
                                <h2 class="review__title">This product is amazing!</h2>
                                <span class="review__aggregate aggregate--1">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </span>
                                <h3 class="review__author">By Joshua</h3>
                            </header>
                            <section class="review__body">
                                <p>Lorem ipsum dolor sit amet, <a href="#">consectetur <b>adipiscing elit.</b></a> Nullam maximus nisl sapien, <b>elementum gravida dui</b> consequat non.</p>
                                <p>Fusce mollis facilisis maximus. Nullam a velit sem. Nunc magna nisi, dapibus vitae dui ac, ullamcorper iaculis libero. Mauris in dui ut dui vulputate bibendum. Sed leo nunc, lobortis a rutrum ut, pulvinar ac erat.</p>
                            </section>
                        </article>
                        <article class="review__instance">
                            <header class="review__header">
                                <h2 class="review__title">This product is amazing!</h2>
                                <span class="review__aggregate aggregate--5">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </span>
                                <h3 class="review__author">By Joshua</h3>
                            </header>
                            <section class="review__body">
                                <p>Lorem ipsum dolor sit amet, <a href="#">consectetur <b>adipiscing elit.</b></a> Nullam maximus nisl sapien, <b>elementum gravida dui</b> consequat non.</p>
                                <p>Fusce mollis facilisis maximus. Nullam a velit sem. Nunc magna nisi, dapibus vitae dui ac, ullamcorper iaculis libero. Mauris in dui ut dui vulputate bibendum. Sed leo nunc, lobortis a rutrum ut, pulvinar ac erat.</p>
                            </section>
                        </article>
                        
                    </section>
                </article>
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
                selectedTab: 'description',
                isAddReviewActive: false,
                
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
                return axios.get('/data/data.demo-response.json');   
            },
            set(d) {
                this.product = d;
            },
            
            /*
            Review postbacks
            */
            reviewFailure() {

            },
            reviewSuccess() {
                this.isAddReviewActive = false;
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
                            size: this.configuratorAvailableSizes[this.userinput.size.value + 1].value,
                            url: "/product/" + this.product.productName.split(' ').join('-').toLowerCase() + '-' + this.product.productId
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
            addReview() {

                this.isAddReviewActive = true;
                this.selectedTab = 'reviews';

                window.scroll(0, document.getElementById('information').offsetTop);

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
            availabledSizes() {
                return ['s', 'xs'];
            },
            productVideosParsed() {

                if(this.product.productVideos.length > 0) {
                    let output = [];
                    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    this.product.productVideos.forEach(link => {
                        var match = link.match(regExp);
                        if(match && match[2].length == 11) {
                            output.push(match[2]);
                        }
                    });
                    if(output.length > 0) {
                        return output;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }

            },
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
            },
            previousPriceFormatted() {

                return this.currentSalesPrice.previousPrice.toString().split('.')[0];

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

            let id = this.$route.params.product;

            const data = this.get(0).then(response => {
                if(response.status !== 200) {
                    this.$router.push({path: '/not-found'});
                } else {
                    let product = response.data.data.filter(x => x.productId == id);
                    if(product.length > 0) {
                        this.product = product[0];
                        this.selectedVariantImages = this.product.productVariants[0].variantImages;
                        this.changeCurrentSalesPrice(this.$root.shop.settings.currency);
                        this.fetched = true;
                    } else {
                        this.$router.push({path: '/not-found'});
                    }
                }
            });

        }
    }
</script>
