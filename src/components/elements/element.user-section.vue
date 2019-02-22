<template>  
    <section class="top-infobar__user-section">
        <template v-if="this.$root.shop.customer.isCustomerLoggedIn">
            <div class="user-section__profile">
                <router-link class="user-section__link" tag="a" to="/">{{ this.$root.shop.customer.customerName }}</router-link>
            </div>
        </template>
        <template v-else>
            <div class="user-section__signup">
                <router-link class="user-section__link" tag="a" to="/sign-up">Register</router-link>
            </div>
            <div class="user-section__login">
                <router-link class="user-section__link" tag="a" to="/sign-up">Sign in</router-link>
            </div>
        </template>
    </section>
</template>

<script>

    export default {

    }

</script>