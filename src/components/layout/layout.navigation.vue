<template>  
    <nav :class="'site-navigation ' + homepage()">
        <div class="shop-content">
            <site-search/>
            <ul class="navigation__menu">
                <li>
                    <router-link tag="a" to="/products/men" class="item__link has-submenu">Men</router-link>
                    <ul class="item__submenu">
                        <li class="submenu__section section--50">
                            <router-link tag="a" to="/products/men/casual" class="section__headline">Casual</router-link>
                            <ul class="section__content">
                                <li><router-link tag="a" to="/products/men/casual/jackets">Jackets</router-link></li>
                                <li><router-link tag="a" to="/products/men/casual/hoodies-and-sweatshirts">Hoodies &amp; Sweatshirts</router-link></li>
                                <li><router-link tag="a" to="/products/men/casual/polo-shirts">Polo Shirts</router-link></li>
                                <li><router-link tag="a" to="/products/men/casual/sportswear">Sportswear</router-link></li>
                                <li><router-link tag="a" to="/products/men/casual/trousers-and-chinos">Trousers &amp; Chinos</router-link></li>
                                <li><router-link tag="a" to="/products/men/casual/tshirts">T-Shirts</router-link></li>
                            </ul>
                        </li>
                        <li class="submenu__section section--50">
                            <router-link tag="a" to="/products/men/formal" class="section__headline">Formal</router-link>
                            <ul class="section__content">
                                <li><router-link tag="a" to="/products/men/formal/jackets">Jackets</router-link></li>
                                <li><router-link btag="a" to="/products/men/formal/shirts">Shirts</router-link></li>
                                <li><router-link tag="a" to="/products/men/formal/suits">Suits</router-link></li>
                                <li><router-link tag="a" to="/products/men/formal/trousers">Trousers</router-link></li>
                            </ul>
                        </li>
                        <li class="submenu__section section__sale section--100">
                            <b>AUTUMN SALE!</b>
                            <span>UP TO 50% OFF</span>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link tag="a" to="/products/women" class="item__link has-submenu">Women</router-link>
                    <ul class="item__submenu">
                        <li class="submenu__section section--50">
                            <router-link tag="a" to="/products/women/casual" class="section__headline">Casual</router-link>
                            <ul class="section__content">
                                <li><router-link tag="a" to="/products/women/casual/tshirts">T-Shirts</router-link></li>
                                <li><router-link tag="a" to="/products/women/casual/hoodies-and-sweatshirts">Hoodies &amp; Sweatshirts</router-link></li>
                                <li><router-link tag="a" to="/products/women/casual/camis">Camis</router-link></li>
                                <li><router-link tag="a" to="/products/women/casual/sweatpants">Swetpants</router-link></li>
                                <li><router-link tag="a" to="/products/women/casual/jeans">Jeans</router-link></li>
                            </ul>
                        </li>
                        <li class="submenu__section section--50">
                            <router-link tag="a" to="/products/women/formal" class="section__headline">Formal</router-link>
                            <ul class="section__content">
                                <li><router-link tag="a" to="/products/women/formal/skirts">Skirts</router-link></li>
                                <li><router-link tag="a" to="/products/women/formal/blouses">Blouses</router-link></li>
                                <li><router-link tag="a" to="/products/women/formal/slacks">Slacks</router-link></li>
                                <li><router-link tag="a" to="/products/women/formal/pants">Pants</router-link></li>
                                <li><router-link tag="a" to="/products/women/formal/cocktail-dresses">Cocktail Dresses</router-link></li>
                                <li><router-link tag="a" to="/products/women/formal/gowns">Gowns</router-link></li>
                            </ul>
                        </li>
                        <li class="submenu__section section__sale section--100">
                            <b>AUTUMN SALE!</b>
                            <span>UP TO 50% OFF</span>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link tag="a" class="item__link" to="/brand">The Brand</router-link>
                </li>
                <li>
                    <router-link tag="a" class="item__link has-submenu" to="/stores">Local stores</router-link>
                    <ul class="item__submenu">
                        <li class="submenu__section section--50">
                            <span class="section__headline">Europe</span>
                            <ul class="section__content">
                                <li><router-link tag="a" to="/stores/prague">Prague</router-link></li>
                                <li><router-link tag="a" to="/stores/budapest">Budepest</router-link></li>
                                <li><router-link tag="a" to="/stores/berlin">Berlin</router-link></li>
                                <li><router-link tag="a" to="/stores/london">London</router-link></li>
                                <li><router-link tag="a" to="/stores/moscow">Moscow</router-link></li>
                            </ul>
                        </li>
                        <li class="submenu__section section--50">
                            <span class="section__headline">United States</span>
                            <ul class="section__content">
                                <li><router-link tag="a" to="/stores/new-york">New York</router-link></li>
                                <li><router-link tag="a" to="/stores/washington">Washington</router-link></li>
                                <li><router-link tag="a" to="/stores/san-fransisco">San Francisco</router-link></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link class="item__link has-submenu" tag="a" to="/look-book">Look Book</router-link>
                    <ul class="item__submenu">
                        <li class="submenu__link"><router-link tag="a" to="/look-book/spring-2019">Spring 2019</router-link></li>
                        <li class="submenu__link"><router-link tag="a" to="/look-book/winder-2018">Winter 2018</router-link></li>
                        <li class="submenu__link"><router-link tag="a" to="/look-book/autumn-2018">Autumn 2018</router-link></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
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