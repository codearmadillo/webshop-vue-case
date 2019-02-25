<template>
    <div class="shop">
        <div class="shop-content product-list__sorting">
            <ul class="sorting__options">
                <li @click="sortlist(0)" :class="(activefilter === 0) ? 'option--active' : ''">Popular</li>
                <li @click="sortlist(1)" :class="(activefilter === 1) ? 'option--active' : ''">New arrivals</li>
                <li @click="sortlist(2)" :class="(activefilter === 2) ? 'option--active' : ''">Best sellers</li>
                <li @click="sortlist(3)" :class="(activefilter === 3) ? 'option--active' : ''">Special offers</li>
                <li @click="sortlist(4)" :class="(activefilter === 4) ? 'option--active' : ''">Coming soon</li>
            </ul>
        </div> 
        <div v-if="fetched" class="shop-content product-list__list product-list">
            <product v-for="product in products"
                :data="product"
            ></product>
        </div>
        <div v-else class="product__loader">
            <i class="fa fa-spinner fa-spin"></i>
        </div>
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
                activefilter: 0
            }
        },  
        components: {
            'product': () => import("@/components/elements/element.product.vue")
        },
        methods: {
            get(id) {
                return axios.get('/data/data.demo-response.json');   
            },
            sortlist(id) {

                this.activefilter = id;

                function shuffle(array) {

                    var currentIndex = array.length, temporaryValue, randomIndex;

                    while (0 !== currentIndex) {
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;

                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }

                    return array;
                }

                this.products = shuffle(this.products);
            }
        },
        async created() {
            const data = this.get(0).then(response => {
                if(response.status !== 200) {
                    this.failed = true;
                } else {
                    this.products = response.data.data;
                    this.fetched = true;
                }
            }); 
        }
    }

</script>
