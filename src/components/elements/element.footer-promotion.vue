<template>  
    <section class="footer__promotion">
        <a :href="currentPromotion.url" :title="currentPromotion.title">
            <section class="promotion__element element--event">
                <span v-html="currentPromotion.content"></span>
            </section>
        </a>
        <section class="promotion__element element--social-media">
            <span class="media-account__element" v-for="account in socialAccounts">
                <a :href="account.url" :title="account.title">
                    <i :class="account.icon"></i>
                </a>
            </span>
        </section>
    </section>
</template>

<script>

    export default {
        data() {
            return {
                socialAccounts: this.$root.shop.socialMedia,
                currentPromotion: this.$root.shop.promotions.footer
            }
        }
    }

</script>