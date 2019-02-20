<template>
    <div>
        <div class="shop-content local-stores__wrapper">
            <section class="local-stores__list">

                <article v-for="store in descendants" :key="store.name">
                    <header class="store__header">
                        <h2>{{ store.meta.locationTitle }}</h2>
                        <h4>{{ store.meta.locationAddress }}</h4>
                    </header>
                    <p class="store__description">{{ store.meta.locationDescription }}</p>
                    <router-link tag="a" :to="'/local-stores/' + store.path" class="btn btn--default btn--hover-action store__link">View details</router-link>
                </article>

            </section>
        </div>  

        <router-view name="store-detail" />

    </div>
</template>

<script>

    export default {
        computed: {
            descendants() {
                return this.$router.options.routes.find(x => x.name === 'local-stores').children;
            }
        }
    }

</script>
