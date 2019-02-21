<template>  

    <v-input
        elementType="select"
        elementName="currency-selector"
        elementClassname="top-infobar__currency-selector"
        elementLabel="Currency :"
        elementClassPrefix="currency-selector"
        :options="options"
        v-model="currency"
        @input="changeGlobalCurrency"
    />

</template>

<script>

    import { EventBus } from "@/event-bus";

    export default {
        data() {
            return {
                'currency': null,
                'options' : []
            }
        },
        components: {
            'v-input' : () => import('@/components/entities/entity.input.vue')
        },
        beforeMount() {
            
            this.get();
            
        },
        methods: {
            get() {
                let self = this;
                for(let key in this.$root.$data.currencies) {
                    let ctx = this.$root.$data.currencies[key];
                    self.options.push({
                        key: ctx.id,
                        value: ctx.tag
                    });
                }
            },
            changeGlobalCurrency(response) {
                this.$root.settings.shop.currency = response.value;
                EventBus.$emit('currency-change', response.value);
            }
        }
    }

</script>