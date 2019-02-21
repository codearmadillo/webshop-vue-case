<template>
    <div class="shop-content">

    </div>
</template>

<script>

export default {
  components: {
    'v-form' : () => import('@/components/entities/entity.form.vue'),
    'v-input' : () => import('@/components/entities/entity.input.vue')
  },
  methods: {
    failure() {
      console.log('Something went wrong');
    },
    success(data) {
      console.log('Success!');
      console.log(data);
    }
  }
}

</script>
