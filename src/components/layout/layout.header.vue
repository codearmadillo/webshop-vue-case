<template>  

    <header :class="homepage()">
        <div class="shop-content">
            Header
        </div>
    </header>

</template>

<script>

    export default {
        methods: {
            homepage() {
                let prefix = 'site-header';
                let page = this.$route.name == 'homepage' ? 'header--homepage' : 'header--default';

                return prefix + ' ' + page;
            }
        }
    }

</script>   