<template>
    <div class="shop-content product-details__wrapper">
        <section class="product-details__images">
            <img style="display: none" src="https://www.na-kd.com/globalassets/nakd_basic_sweater_1044-000019-0115_01a_r1.jpg?maxheight=3200&mode=max&ref=B7506A992D&width=2560" />
        </section>
        <section class="product-details__page-controls">
            <header>
                <h2 class="product__name">
                    AVE Classic Sweatshirt
                </h2>
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
                    <a class="share__link" :href="'https://pinterest.com/pin/create/button/?url=' + shareurl + '&media=Image' + currentimage" title="Pinterest">
                        <i class="fab fa-pinterest-p"></i>
                    </a>
                </span>
            </section>
            <section class="product__prices">
                <span class="price__previous price--gbp"><span class="price__currency">£</span>107</span>
                <span class="price__current price--gbp"><span class="price__currency">£</span>89,99</span>
            </section>
            <section class="product__meta">
                <span class="product-meta__field meta--availability">
                    <span class="meta__label">Availability:</span>
                    <span class="meta__value">In stock</span>
                </span>
                <span class="product-meta__field meta--product-code">
                    <span class="meta__label">Product code:</span>
                    <span class="meta__value">499577</span>
                </span>
                <span class="product-meta__field meta--tags">
                    <span class="meta__label">Tags:</span>
                    <span class="meta__value">
                        <a class="meta__tag" href="#" title="#">Classic</a>
                        <a class="meta__tag" href="#" title="#">Casual</a>
                        <a class="meta__tag" href="#" title="#">V-Neck</a>
                        <a class="meta__tag" href="#" title="#">Loose</a>
                    </span>
                </span>
            </section>
            <section class="product__information">
                <p class="product__short-description">
                    Donec sem lorem laoreet tempor un risus vitae, rutrum sodales nibh suspendisse est congue metus nunc, id viverra elit loreti rhoncus quis consecteur es. Donec pulvinar tempor lorem a pretium justo interdum.
                </p>
                <ul class="product__props">
                    <li>Elasticated cuffs</li>
                    <li>Casual fit</li>
                    <li>100% Cotton</li>
                    <li>Free shipping with 4 days delivery</li>
                </ul>
            </section>
            <section class="product__configurator">
                <v-input
                    v-model="userinput.colour"
                    elementName="colour"
                    elementType="select"
                    elementLabel="Colour"
                    elementClassname="configurator__colour"
                    :options="[
                        {
                            key: null,
                            value: 'Select Colour',
                            disabled: true,
                            selected: true,
                            required: true
                        },
                        {
                            key: 0,
                            value: 'Red',
                        },
                        {
                            key: 1,
                            value: 'Black',
                        }
                    ]"
                    :isRequired="true"
                />
                <v-input
                    v-model="userinput.size"
                    elementName="size"
                    elementType="select"
                    elementLabel="Size"
                    elementClassname="configurator__size"
                    :options="[
                        {
                            key: null,
                            value: 'Select Size',
                            selected: true,
                            disabled: true
                        },
                        {
                            key: 0,
                            value: 'XS',
                        },
                        {
                            key: 1,
                            value: 'S',
                        },
                        {
                            key: 2,
                            value: 'M',
                        },
                        {
                            key: 3,
                            value: 'L',
                        }
                    ]"
                    :isRequired="true"
                />
                <v-input
                    v-model="userinput.qty"
                    elementType="number"
                    elementName="quantity"
                    elementLabel="Qty"
                    elementClassname="configurator__qty"
                    elementPlaceholder="1"
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
</template>

<script>
    import axios from "axios";

    export default {
        components: {
            'v-form': () => import('@/components/entities/entity.form.vue'),
            'v-input': () => import('@/components/entities/entity.input.vue')
        },
        data() {
            return {
                data: null,
                userinput: {
                    size: null,
                    colour: null,
                    qty: null
                },
                selectedTab: null,
                selectedVariant: 0,
                shareurl: window.location.href,
                currentimage: ''
            }
        },
        beforeMount() {
            axios.get('/data/data.demo-product.json').then(response => {
                this.data = response.data;
            });
        },
        methods: {
            addToBasket() {
                console.log('Adding to basket');
            },
            addToLookbook() {
                console.log('Adding to lookbook');
            },
            addToCompare() {
                console.log('Adding to compare');
            },
            selectTab(sectionId) {
                this.selectedTab = sectionId;
            }
        }
    }
</script>
