<template>
  <div class="shop-content">
    {{ location }}
  </div>
</template>

<script>

export default {
  computed: {
    location() {

      let qry = this.$route.query.location;

      return qry == 'eu' || qry == 'us' ? qry : '';

    }
  }
}

</script>
