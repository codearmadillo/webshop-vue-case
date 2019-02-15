<template>
  <div class="hello">
    <city-select
        identifier="city-select"
        label="Choose city"
        :options="[
            {v:'london',l:'London'},
            {v:'newyork',l:'New York'},
            {v:'copenhagen',l:'Copenhagen'}
        ]"
    />
    <currency-select 
        identifier="select-currency"
        label="Currency"
        :options="[
            {v:'gbp', l:'GBP'},
            {v:'eur', l:'EUR'},
            {v:'usd', l:'USD'}
        ]"
        classname="select--currency"
    />
  </div>
</template>

<script>

import Select from '@/components/Select.vue'

  export default {
    name: 'Demo',
    data () {
      return {
        msg: 'Welcome to Crypto Info'
      }
    },
    components: {
        'currency-select' : Select,
        'city-select' : Select
    }
  }
</script>