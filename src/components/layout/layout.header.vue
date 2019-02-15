<template>  

    <header :class="homepage()">
        
        <site-navigation/>

        <div class="shop-content">
            Header
        </div>
    </header>

</template>

<script>

    export default {
        components: {
            'site-navigation' : () => import('@/components/elements/element.navigation.vue')
        },
        methods: {
            homepage() {
                let prefix = 'site-header';
                let page = this.$route.name == 'homepage' ? 'header--homepage' : 'header--default';

                return prefix + ' ' + page;
            }
        }
    }

</script>   