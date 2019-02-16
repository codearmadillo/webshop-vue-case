<template>  
    <span class="navigation__search">
        <v-input
            identifier="search"
            name="search"
            type="text"
            classname="search__field"
            placeholder="Search"
            @submit="search"
            ref="searchfield"
        />
        <span class="search__icon">
            <i class="fa fa-search" @click="searchbutton"></i>
        </span>
    </span>
</template>

<script>

    export default {
        components: {
            'v-input' : () => import('@/components/entities/entity.input.vue')
        },
        methods: {
            search(value) {

                this.$router.push('/search?q=' + encodeURIComponent(value));

            },
            searchbutton() {
            
                let field = this.$refs.searchfield;

            }
        }
    }

</script>