<template>
    <router-link tag="a" title="" class="product__instance" to="/">
        <span class="product__price">
            <span class="price--previous"><span class="price__currency">£</span>107</span>
            <span class="price--current"><span class="price__currency">£</span>89.99</span>
        </span>
        <article class="product__image">

        </article>
    </router-link>
</template>

<script>
    export default {
        props: {
            productid: {
                type: String,
                required: true
            }
        }
    }
</script>