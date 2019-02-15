<template>  
    <nav :class="'site-navigation ' + homepage()">
        <ul>
            <li>
                <a href="/list">Men</a>
                <ul class="submenu">
                    <li class="submenu__section">
                        <a class="section__headline" href="/list">Casual</a>
                        <ul class="section__content">
                            <li><a href="/list">Jackets</a></li>
                            <li><a href="/list">Hoodies &amp; Sweatshirts</a></li>
                            <li><a href="/list">Polo Shirts</a></li>
                            <li><a href="/list">Trousers &amp; Chinos</a></li>
                            <li><a href="/list">T-Shirts</a></li>
                        </ul>
                    </li>
                    <li class="submenu__section">
                        <a class="section__headline" href="/list">Formal</a>
                        <ul class="section__content">
                            <li><a href="/list">Jackets</a></li>
                            <li><a href="/list">Shirts</a></li>
                            <li><a href="/list">Suits</a></li>
                            <li><a href="/list">Trousers</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                <a href="/list">Women</a>
                <ul class="submenu">
                    <li class="submenu__section">
                        <a class="section__headline" href="/list">Casual</a>
                        <ul class="section__content">
                            <li><a href="/list">Jackets</a></li>
                            <li><a href="/list">Hoodies &amp; Sweatshirts</a></li>
                            <li><a href="/list">Polo Shirts</a></li>
                            <li><a href="/list">Trousers &amp; Chinos</a></li>
                            <li><a href="/list">T-Shirts</a></li>
                        </ul>
                    </li>
                    <li class="submenu__section">
                        <a class="section__headline" href="/list">Formal</a>
                        <ul class="section__content">
                            <li><a href="/list">Jackets</a></li>
                            <li><a href="/list">Shirts</a></li>
                            <li><a href="/list">Suits</a></li>
                            <li><a href="/list">Trousers</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                <a href="/brand">The Brand</a>
            </li>
            <li>
                <a href="/stores">Local Stores</a>
                <ul class="submenu">
                    <li class="submenu__section">
                        <a class="section__headline" href="/stores?location=eu">Europe</a>
                        <ul class="section__content">
                            <li><a href="/stores/prague">Prague</a></li>
                            <li><a href="/stores/budapest">Budapest</a></li>
                            <li><a href="/stores/berlin">Berlin</a></li>
                            <li><a href="/stores/london">London</a></li>
                            <li><a href="/stores/moscow">Moscow</a></li>
                        </ul>
                    </li>
                    <li class="submenu__section">
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
                <a href="#">Look Book</a>
                <ul class="submenu">
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
    </nav>
</template>

<script>

    export default {
        methods: {
            homepage() {
                return this.$route.name == 'homepage' ? 'navigation--homepage' : 'navigation--default';
            }
        }
    }

</script>