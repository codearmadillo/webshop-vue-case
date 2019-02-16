<template>  

    <header :class="homepage()">
        <div class="shop-content">
            <template v-if="this.$route.name == 'homepage'">
                <router-link to="/list" class="btn btn--default">Shop men's collection</router-link>
            </template>
            <template v-else>

                <h1 class="header__title">{{ this.$route.meta.title }}</h1>
                <h2 class="header__subtitle" v-if="subtitle !== null">{{ subtitle }}</h2>
                <ul class="header__breadcrumbs" v-if="subtitle == null && breadcrumbs !== null && breadcrumbs.length > 1">
                    <li class="breadcrumbs__crumb" v-for="crumb in breadcrumbs">
                        <a class="breadcrumb__link" :href="crumb.path">{{ crumb.title }}</a>  
                    </li>
                </ul>
            
            </template>
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
        },
        computed: {
            subtitle() {
                return this.$route.meta.hasOwnProperty('subtitle') ? this.$route.meta.subtitle : null;
            },
            breadcrumbs() {
                return this.$route.meta.hasOwnProperty('breadcrumbs') ? this.$route.meta.breadcrumbs : null;
            }
        }
    }

</script>   