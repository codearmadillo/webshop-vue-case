<template>
    <div v-if="fetched" class="shop-content product-list__list product-list">
        <product v-for="product in products"
            :data="product"
        ></product>
    </div>
    <div v-else class="product__loader">
        <i class="fa fa-spinner fa-spin"></i>
    </div>
</template>

<script>

    import axios from "axios";

    export default {
        data() {
            return {
                failed: false,
                fetched: false,
                products: []
            }
        },  
        components: {
            'product': () => import("@/components/elements/element.product.vue")
        },
        methods: {
            get(id) {
                return axios.get('/data/data.demo-response.json');   
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
