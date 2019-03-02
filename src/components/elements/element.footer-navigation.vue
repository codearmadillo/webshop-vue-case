<template>  
    <section class="footer__navigation">

        <nav class="footer__nav">
            <header class="navigation__header navigation__header--has-dropdown" @click="reset('information')">Information</header>
            <section :class="'navigation__dropdown' + (props.information == false ? ' collapsed' : '')">
                <router-link to="/brand" tag="a">The brand</router-link>
                <router-link to="/local-stores" tag="a">Local stores</router-link>
                <router-link to="/not-found" tag="a">Customer service</router-link>
                <router-link to="/not-found" tag="a">Privacy &amp; cookies</router-link>
                <router-link to="/not-found" tag="a">Site map</router-link>
            </section>
        </nav> 

         <nav class="footer__nav">
            <header class="navigation__header navigation__header--has-dropdown" @click="reset('buyfromus')">Why buy from us</header>
            <section :class="'navigation__dropdown' + (props.buyfromus == false ? ' collapsed' : '')">
                <router-link to="/not-found" tag="a">Shipping &amp; returns</router-link>
                <router-link to="/not-found" tag="a">Secure shopping</router-link>
                <router-link to="/not-found" tag="a">Testemonials</router-link>
                <router-link to="/not-found" tag="a">Award winning</router-link>
                <router-link to="/not-found" tag="a">Ethical trading</router-link>
            </section>
        </nav>

        <nav class="footer__nav">
            <header class="navigation__header navigation__header--has-dropdown" @click="reset('account')">Your account</header>
            <section :class="'navigation__dropdown' + (props.account == false ? ' collapsed' : '')">
                <router-link to="/sign-up" tag="a">Sign in</router-link>
                <router-link to="/sign-up" tag="a">Register</router-link>
                <router-link to="/not-found" tag="a">View cart</router-link>
                <router-link to="/not-found" tag="a">View your lookbook</router-link>
                <router-link to="/not-found" tag="a">Track an order</router-link>
                <router-link to="/not-found" tag="a">Update information</router-link>
            </section>
        </nav>

        <nav class="footer__nav">
            <header class="navigation__header navigation__header--has-dropdown" @click="reset('lookbook')">Lookbook</header>
            <section :class="'navigation__dropdown' + (props.lookbook == false ? ' collapsed' : '')">
                <router-link to="/not-found" tag="a">Latest posts</router-link>
                <router-link to="/not-found" tag="a">Men's lookbook</router-link>
                <router-link to="/not-found" tag="a">Women's lookbook</router-link>
                <router-link to="/not-found" tag="a">Lookbooks RSS feed</router-link>
                <router-link to="/not-found" tag="a">View your lookbook</router-link>
                <router-link to="/not-found" tag="a">Delete your lookbook</router-link>
            </section>
        </nav>

        <section class="footer__nav">
            <header class="navigation__header">Contact details</header>
            <ul class="navigation__address">
                <li>Head Office: Avenue Fashion,</br>180-182 Regent Street, London</li>
                <li>Telephone: 0123-456-789</li>
                <li>Email: support@yourwebsite.com</li>
            </ul>
        </section>
    </section>
</template>

<script>

    export default {
        data() {
            return {
                props: {
                    lookbook: false,
                    account: false,
                    buyfromus: false,
                    information: false
                }
            }
        },
        methods: {
            reset(val) {

                for(let key in this.props) {
                    if(val == key) {
                        this.props[key] = !this.props[key];
                    } else {
                        this.props[key] = false;
                    }
                }

            }
        }
    }

</script>