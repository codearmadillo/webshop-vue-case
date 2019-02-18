<template>  

    <v-input
        elementType="select"
        elementName="currency-selector"
        elementClassname="top-infobar__currency-selector"
        elementLabel="Currency"
        :options="[
            {
                key: 'gbp',
                value: 'GBP'
            },
            {
                key: 'eur',
                value: 'EUR'
            },
            {
                key: 'usd',
                value: 'USD'
            }
        ]"
        v-model="currency"
        @input="changeGlobalCurrency"
    />

</template>

<script>

    export default {
        data() {
            return {
                'currency': null
            }
        },
        components: {
            'v-input' : () => import('@/components/entities/entity.input.vue')
        },
        methods: {
            changeGlobalCurrency(response) {
                this.$root.settings.shop.currency = response.value;
            }
        }
    }

</script>