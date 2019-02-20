<template>
    <div class="local-stores__detail-wrapper">

        <section class="store__map">
            Map
        </section>
        <section class="store__information">
            <header class="store__header">
                <h2>{{ this.$route.meta.locationTitle }}</h2>
                <h4>{{ this.$route.meta.locationAddress }}</h4>
            </header>
            <p class="store__description">{{ this.$route.meta.locationDescription }}</p>
            <ul class="store__contact">
                <li><i class="fa fa-map-marker-alt"></i> {{ this.$route.meta.locationAddress }}</li>
                <template v-if="this.$route.meta.locationContact.length > 0">
                    <li v-for="contact in this.$route.meta.locationContact">
                        <i ></i>  HEY
                    </li>
                </template> 
                
            </ul>
        </section>
    
    </div>
</template>

<script>

    export default { }

</script>
  