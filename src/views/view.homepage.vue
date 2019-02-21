<template>
    <div class="shop-content">
        
    </div>
</template>

<script>

export default {
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
