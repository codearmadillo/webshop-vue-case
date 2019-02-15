<template>  
    <nav :class="'site-navigation ' + homepage()">
        <div class="shop-content">
            <site-search/>
            <ul class="navigation__menu">
                <li>
                    <a class="item__link has-submenu" href="#">Men</a>
                    <ul class="item__submenu">
                        <li class="submenu__section section--50">
                            <a class="section__headline" href="/list">Casual</a>
                            <ul class="section__content">
                                <li><a href="/list">Jackets</a></li>
                                <li><a href="/list">Hoodies &amp; Sweatshirts And Somethig Nice</a></li>
                                <li><a href="/list">Polo Shirts</a></li>
                                <li><a href="/list">Trousers &amp; Chinos</a></li>
                                <li><a href="/list">T-Shirts</a></li>
                            </ul>
                        </li>
                        <li class="submenu__section section--50">
                            <a class="section__headline" href="/list">Formal</a>
                            <ul class="section__content">
                                <li><a href="/list">Jackets</a></li>
                                <li><a href="/list">Shirts</a></li>
                                <li><a href="/list">Suits</a></li>
                                <li><a href="/list">Trousers</a></li>
                            </ul>
                        </li>
                        <li class="submenu__section section__sale section--100">
                            <b>AUTUMN SALE!</b>
                            <span>UP TO 50% OFF</span>
                        </li>
                    </ul>
                </li>
                <li>
                    <a class="item__link has-submenu" href="#">Women</a>
                    <ul class="item__submenu">
                        <li class="submenu__section section--50">
                            <a class="section__headline" href="/list">Casual</a>
                            <ul class="section__content">
                                <li><a href="/list">Jackets</a></li>
                                <li><a href="/list">Hoodies &amp; Sweatshirts</a></li>
                                <li><a href="/list">Polo Shirts</a></li>
                                <li><a href="/list">Trousers &amp; Chinos</a></li>
                                <li><a href="/list">T-Shirts</a></li>
                            </ul>
                        </li>
                        <li class="submenu__section section--50">
                            <a class="section__headline" href="/list">Formal</a>
                            <ul class="section__content">
                                <li><a href="/list">Jackets</a></li>
                                <li><a href="/list">Shirts</a></li>
                                <li><a href="/list">Suits</a></li>
                                <li><a href="/list">Trousers</a></li>
                            </ul>
                        </li>
                        <li class="submenu__section section__sale section--100">
                            <b>AUTUMN SALE!</b>
                            <span>UP TO 50% OFF</span>
                        </li>
                    </ul>
                </li>
                <li>
                    <a class="item__link active" href="/brand">The Brand</a>
                </li>
                <li>
                    <a class="item__link has-submenu" href="#">Local Stores</a>
                    <ul class="item__submenu">
                        <li class="submenu__section section--50">
                            <a class="section__headline" href="/stores?location=eu">Europe</a>
                            <ul class="section__content">
                                <li><a href="/stores/prague">Prague</a></li>
                                <li><a href="/stores/budapest">Budapest</a></li>
                                <li><a href="/stores/berlin">Berlin</a></li>
                                <li><a href="/stores/london">London</a></li>
                                <li><a href="/stores/moscow">Moscow</a></li>
                            </ul>
                        </li>
                        <li class="submenu__section section--50">
                            <a class="section__headline" href="/stores?location=us">United States</a>
                            <ul class="section__content">
                                <li><a href="/stores/new-york">New York</a></li>
                                <li><a href="/stores/washington">Washington</a></li>
                                <li><a href="/stores/san-franscisco">San Francisco</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <a class="item__link has-submenu" href="#">Look Book</a>
                    <ul class="item__submenu">
                        <li class="submenu__link">
                            <a href="#">Spring 2019</a>
                        </li>
                        <li class="submenu__link">
                            <a href="#">Winter 2018</a>
                        </li>
                        <li class="submenu__link">
                            <a href="#">Autumn 2018</a>
                        </li>
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