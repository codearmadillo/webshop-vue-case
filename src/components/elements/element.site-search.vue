<template>  
    <span class="navigation__search">
        <v-input
            elementType="text"
            elementName="navigation-search"
            elementClassname="search__field"
            elementPlaceholder="Search"
            iconAfter="fa fa-search"
            :iconAfterIsClickable="true"
            :isSearch="true"
            :renderLabel="false"
        />
    </span>
</template>

<script>

    export default {
        components: {
            'v-input' : () => import('@/components/entities/entity.input.vue')
        }
    }

</script>