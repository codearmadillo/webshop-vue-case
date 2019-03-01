<template>  
    <section :class="'site-navigation ' + homepage()">
        <div class="shop-content">
            <site-search/>
            <nav class="navigation__nav-wrapper">
                <ul class="navigation__menu">
                    <li>
                        <a href="javascript:null" class="item__link has-submenu">Men</a>
                        <ul class="item__submenu">
                            <li class="submenu__section section--50">
                                <span class="section__headline">Casual</span>
                                <ul class="section__content">
                                    <li><router-link tag="a" to="/products/men/casual/jackets" title="Jackets">Jackets</router-link></li>
                                    <li><router-link tag="a" to="/products/men/casual/hoodies-and-sweatshirts" title="Hoodies &amp; Sweatshirts">Hoodies &amp; Sweatshirts</router-link></li>
                                    <li><router-link tag="a" to="/products/men/casual/polo-shirts" title="Polo Shirts">Polo Shirts</router-link></li>
                                    <li><router-link tag="a" to="/products/men/casual/sportswear" title="Sportswear">Sportswear</router-link></li>
                                    <li><router-link tag="a" to="/products/men/casual/trousers-and-chinos" title="Trouserss &amp; Chinos">Trousers &amp; Chinos</router-link></li>
                                    <li><router-link tag="a" to="/products/men/casual/tshirts" title="T-Shirts">T-Shirts</router-link></li>
                                </ul>
                            </li>
                            <li class="submenu__section section--50">
                                <span class="section__headline">Formal</span>
                                <ul class="section__content">
                                    <li><router-link tag="a" to="/products/men/formal/jackets" title="Jackets">Jackets</router-link></li>
                                    <li><router-link tag="a" to="/products/men/formal/shirts" title="Shirts">Shirts</router-link></li>
                                    <li><router-link tag="a" to="/products/men/formal/suits" title="Suits">Suits</router-link></li>
                                    <li><router-link tag="a" to="/products/men/formal/trousers" title="Trousers">Trousers</router-link></li>
                                </ul>
                            </li>
                            <li class="submenu__section section__sale section--100">
                                <b>AUTUMN SALE!</b>
                                <span>UP TO 50% OFF</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:null" class="item__link has-submenu">Women</a>
                        <ul class="item__submenu">
                            <li class="submenu__section section--50">
                                <span class="section__headline">Casual</span>
                                <ul class="section__content">
                                    <li><router-link tag="a" to="/products/women/casual/tshirts" title="T-Shirts">T-Shirts</router-link></li>
                                    <li><router-link tag="a" to="/products/women/casual/hoodies-and-sweatshirts" title="Hoodies &amp; Sweatshirts">Hoodies &amp; Sweatshirts</router-link></li>
                                    <li><router-link tag="a" to="/products/women/casual/camis" title="Camis">Camis</router-link></li>
                                    <li><router-link tag="a" to="/products/women/casual/sweatpants" title="Sweatpants">Sweatpants</router-link></li>
                                    <li><router-link tag="a" to="/products/women/casual/jeans" title="Jeans">Jeans</router-link></li>
                                </ul>
                            </li>
                            <li class="submenu__section section--50">
                                <span class="section__headline">Formal</span>
                                <ul class="section__content">
                                    <li><router-link tag="a" to="/products/women/formal/skirts" title="Skirts">Skirts</router-link></li>
                                    <li><router-link tag="a" to="/products/women/formal/blouses" title="Blouses">Blouses</router-link></li>
                                    <li><router-link tag="a" to="/products/women/formal/slacks" title="Slacks">Slacks</router-link></li>
                                    <li><router-link tag="a" to="/products/women/formal/pants" title="Pants">Pants</router-link></li>
                                    <li><router-link tag="a" to="/products/women/formal/cocktail-dresses" title="Cocktail Dresses">Cocktail Dresses</router-link></li>
                                    <li><router-link tag="a" to="/products/women/formal/gowns" title="Gowns">Gowns</router-link></li>
                                </ul>
                            </li>
                            <li class="submenu__section section__sale section--100">
                                <b>AUTUMN SALE!</b>
                                <span>UP TO 50% OFF</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <router-link tag="a" class="item__link" to="/brand" title="The Brand">The Brand</router-link>
                    </li>
                    <li>
                        <router-link tag="a" class="item__link" to="/local-stores" title="Local Stores">Local stores</router-link>
                    </li>
                    <li>
                        <router-link class="item__link" tag="a" to="/look-book" title="Look Book">Look Book</router-link>
                    </li>
                </ul>
            </nav>
            <span class="navigation__site-logo">
                <router-link class="site-logo__link" to="/" title="Homepage" tag="a">
                    <img class="site-logo__image" alt="Avenue Fashion" src="/assets/images/site-logo.svg" />
                </router-link>
            </span>
        </div>
    </section>
</template>

<script>

    export default {
        components: {
            'site-search': () => import('@/components/elements/element.site-search.vue')
        },
        methods: {
            homepage() {
                return this.$route.name == 'homepage' ? 'navigation--homepage' : 'navigation--default';
            }
        }
    }

</script>