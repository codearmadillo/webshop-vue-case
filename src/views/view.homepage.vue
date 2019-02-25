<template>
    <div class="shop">
        <section class="frontpage__product-list">
            <div class="shop-content product-list__sorting">
                <ul class="sorting__options">
                    <li @click="sortlist('001')" :class="(activefilter === 0) ? 'option--active' : ''">Popular</li>
                    <li @click="sortlist('002')" :class="(activefilter === 1) ? 'option--active' : ''">New arrivals</li>
                    <li @click="sortlist('003')" :class="(activefilter === 2) ? 'option--active' : ''">Best sellers</li>
                    <li @click="sortlist('004')" :class="(activefilter === 3) ? 'option--active' : ''">Special offers</li>
                    <li @click="sortlist('005')" :class="(activefilter === 4) ? 'option--active' : ''">Coming soon</li>
                </ul>
            </div>  
            <div v-if="fetched" class="shop-content product-list__homepage product-list">
                <product v-for="(product, index) in products"
                    :data="product"
                ></product>
            </div>
            <div v-else class="product__loader">
                <i class="fa fa-spinner fa-spin"></i>
            </div>
        </section>
        <section class="frontpage__lookbook">
            <article class="lookbook__instance">
                <span class="lookbook__image">
                    <span class="lookbook__image-fix" style="background-image: url('/assets/images/lookbook.woman.png')"></span>
                </span>
                <div class="lookbook__content">
                    <h2 class="lookbook__headline"><b>Men's</b><br/>Lookbook</h2>
                    <p class="lookbook__desc">Pellentesque habitant morbi tristique senectus et netus et malesuada fames . Pellentesque laoreet quis enim et mattis. Quisque interdum felis tellus.</p>
                    <span class="lookbook__action">
                        <a href="#" title="View now" class="btn btn--default btn--hover-action">View now</a>
                    </span>
                </div>
            </article>
            <article class="lookbook__instance">
                <span class="lookbook__image">
                    <span class="lookbook__image-fix" style="background-image: url('/assets/images/lookbook.man.png')"></span>
                </span>
                <div class="lookbook__content">
                    <h2 class="lookbook__headline"><b>Women's</b><br/>Lookbook</h2>
                    <p class="lookbook__desc">Pellentesque habitant morbi tristique senectus et netus et malesuada fames . Pellentesque laoreet quis enim et mattis. Quisque interdum felis tellus.</p>
                    <span class="lookbook__action">
                        <a href="#" title="View now" class="btn btn--default btn--hover-action">View now</a>
                    </span>
                </div>
            </article>
            <article class="lookbook__instance">
                <span class="lookbook__image">
                    <span class="lookbook__image-fix" style="background-image: url('/assets/images/lookbook.you.png')"></span>
                </span>
                <div class="lookbook__content">
                    <h2 class="lookbook__headline"><b>Your</b><br/>Lookbook</h2>
                    <p class="lookbook__desc">Pellentesque habitant morbi tristique senectus et netus et malesuada fames . Pellentesque laoreet quis enim et mattis. Quisque interdum felis tellus.</p>
                    <span class="lookbook__action">
                        <a href="#" title="View now" class="btn btn--default btn--hover-action">View now</a>
                    </span>
                </div>
            </article>
        </section>
    </div>
</template>

<script>

    import axios from "axios";

    export default {
        data() {
            return {
                failed: false,
                fetched: false,
                products: [],
                range: {
                    min: 0,
                    max: 6
                },
                activefilter: 0
            }
        },  
        components: {
            'product': () => import("@/components/elements/element.product.vue")
        },
        methods: {
            get() {

                axios.get('/data/data.demo-response.json').then(response => {
                    if(response.status !== 200) {
                        this.failed = true;
                    } else {
                        this.products = response.data.data.slice(this.range.min, this.range.max);
                        this.fetched = true;
                    }
                });

            },
            sortlist(id) {
                this.fetched = false;

                switch(id) {
                    case '001':
                        this.range = {
                            min: 0,
                            max: 6
                        };
                        this.activefilter = 0;
                        break
                    case '002':
                        this.range = {
                            min: 3,
                            max: 9
                        };
                        this.activefilter = 1;
                        break;
                    case '003':
                        this.range = {
                            min: 4,
                            max: 10
                        };
                        this.activefilter = 2;
                        break;
                    case '004':
                        this.range = {
                            min: 2,
                            max: 8
                        };
                        this.activefilter = 3;
                        break;
                    case '005':
                        this.range = {
                            min: 1,
                            max: 7
                        };
                        this.activefilter = 4;
                        break;
                }

                this.get();

            }
        },
        async created() {

            this.get();

        },
        computed: {
            requiresFallback() {

                return Modernizr.objectfit == false;
                
            }
        }
    }

</script>
