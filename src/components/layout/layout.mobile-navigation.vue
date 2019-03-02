<template>  

    <section class="mobile-navigation">
        <div class="shop-content">
            <nav class="navigation__menu">
                <span class="menu__link" @click="reset('offcanvasleft'); elements.offcanvasleft = !elements.offcanvasleft">
                    <i class="fa fa-bars"></i>
                </span>
                <span class="menu__link" @click="reset('dropdownsearch'); elements.dropdownsearch = !elements.dropdownsearch">
                    <i class="fa fa-search"></i>
                </span>
                <span class="menu__link" @click="reset('dropdownuser'); elements.dropdownuser = !elements.dropdownuser">
                    <i class="fa fa-lock"></i>
                </span>
                <span class="menu__link link--cart" @click="reset('offcanvasright'); elements.offcanvasright = !elements.offcanvasright">
                    <i :class="'fa fa-shopping-cart' + (basketitems.length > 0 ? ' cart--full' : '')"></i>
                </span>
            </nav>
        </div>

        <!-- START LEFT OFFCANVAS -->
        <section v-if="elements.offcanvasleft" class="offcanvas offcanvas--left" ref="offcanvasleft">
            <section class="offcanvas__content">
                <span class="offcanvas__close" @click="close('offcanvasleft')"></span>
                <header class="offcanvas__header">Menu</header>
                <section class="offcanvas__body offcanvas__body--navigation">
                    
                    <nav class="navigation__mobile">
                        <div class="nav__category has-submenu">
                            <span class="label label--primary" @click="e => e.target.classList.toggle('active')">Men</span>
                            <div class="submenu">
                                <div class="nav__category has-submenu">
                                    <span class="label label--secondary" @click="e => e.target.classList.toggle('active')">Casual</span>
                                    <div class="submenu">
                                        <router-link class="submenu__link" tag="a" to="/products/men/casual/jackets" title="Jackets">Jackets</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/men/casual/hoodies-and-sweatshirts" title="Hoodies &amp; Sweatshirs">Hoodies &amp; Sweatshirts</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/men/casual/polo-shirts" title="Polo Shifts">Polo Shirts</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/men/casual/sportswear" title="Sportswear" >Sportswear</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/men/casual/trousers-and-chinos" title="Trousers &amp; Chinos">Trousers &amp; Chinos</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/men/casual/tshirts" title="T-Shirts">T-Shirts</router-link>
                                    </div>
                                </div>
                                <div class="nav__category has-submenu">
                                    <span class="label label--secondary" @click="e => e.target.classList.toggle('active')">Formal</span>
                                    <div class="submenu">
                                        <router-link class="submenu__link" tag="a" to="/products/men/formal/jackets" title="Jackets">Jackets</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/men/formal/shirts" title="Shirts">Shirts</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/men/formal/suits" title="Suits">Suits</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/men/formal/trousers" title="Trousers">Trousers</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="nav__category has-submenu">
                            <span class="label label--primary" @click="e => e.target.classList.toggle('active')">Women</span>
                            <div class="submenu">
                                <div class="nav__category has-submenu">
                                    <span class="label label--secondary" @click="e => e.target.classList.toggle('active')">Casual</span>
                                    <div class="submenu">
                                        <router-link class="submenu__link" tag="a" to="/products/women/casual/tshirts" title="T-Shirts">T-Shirts</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/women/casual/hoodies-and-sweatshirts" title="Hoodies &amp; Sweatshirts">Hoodies &amp; Sweatshirts</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/women/casual/camis" title="Camis">Camis</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/women/casual/sweatpants" title="Sweatpants">Sweatpants</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/women/casual/jeans" title="Jeans">Jeans</router-link>
                                    </div>
                                </div>
                                <div class="nav__category has-submenu">
                                    <span class="label label--secondary" @click="e => e.target.classList.toggle('active')">Formal</span>
                                    <div class="submenu">
                                        <router-link class="submenu__link" tag="a" to="/products/women/formal/skirts" title="Skirts">Skirts</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/women/formal/blouses" title="Blouses">Blouses</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/women/formal/slacks" title="Slacks">Slacks</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/women/formal/pants" title="Pants">Pants</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/women/formal/cocktail-dresses" title="Cocktail Dresses">Cocktail Dresses</router-link>
                                        <router-link class="submenu__link" tag="a" to="/products/women/formal/gowns" title="Gowns">Gowns</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="nav__category">
                            <router-link tag="a" to="/brand" title="The Brand" class="label label--primary">The Brand</router-link>
                        </div>
                        <div class="nav__category">
                            <router-link tag="a" to="/local-stores" title="Local Stores" class="label label--primary">Local Stores</router-link>
                        </div>
                        <div class="nav__category">
                            <router-link tag="a" to="/look-book" title="Look Book" class="label label--primary">Look Book</router-link>
                        </div>
                    </nav>

                </section>
            </section>
            <section @click="close('offcanvasleft')" class="offcanvas__blank"></section>
        </section>
        <!-- END LEFT OFFCANVAS -->

        <!-- START RIGHT OFFCANVAS -->
        <section v-if="elements.offcanvasright" class="offcanvas offcanvas--right" ref="offcanvasright">
            <section class="offcanvas__content">
                <span class="offcanvas__close" @click="close('offcanvasright')"></span>
                <header class="offcanvas__header">Shopping cart</header>
                <section class="offcanvas__body offcanvas__basket">

                    <template v-if="basketitems.length > 0">
                        <article v-for="(line, index) in basketitems" class="offcanvas-basket__line">
                            <span class="line__image">
                                <img :src="line.productVariantImage" :alt="line.productName" />
                            </span>
                            <span class="line__description">
                                {{ line.quantity + 'x ' + line.size + ' ' + line.productName }}
                            </span>
                            <span class="line__price">
                                {{ line.lineprice }}
                            </span>
                            <span class="line__remove" @click="removeLine(index)">
                                <i class="fa fa-times"></i>
                            </span>
                        </article>  
                    </template>
                    

                </section>
                <section class="offcanvas__footer offcanvas__basket-footer">
                    <button @click.prevent="emptyBasket()" class="btn btn--default footer__empty-basket">Empty</button>
                    <router-link to="/not-found" tag="a" class="btn btn--action" title="Basket">View basket</router-link>
                </section>
            </section>
            <section @click="close('offcanvasright')" class="offcanvas__blank"></section>
        </section>
        <!-- END RIGHT OFFCANVAS -->

        <!-- START USER DROPDOWN -->
        <section v-if="elements.dropdownuser" class="dropdown" ref="dropdown-user">
        
            <template v-if="this.$root.shop.customer.isCustomerLoggedIn == false">
                <section class="mobile-login">
                    <h3 class="dropdown__subheadline">Log in</h3>
                    <v-form
                        :formElements="[
                            {
                                elementType: 'email',
                                elementName: 'mobilelogin-email',
                                elementPlaceholder: 'Your Email..',
                                elementLabel: 'Email',
                                renderLabel: false,
                                isRequired: true
                            },
                            {
                                elementType: 'password',
                                elementName: 'mobilelogin-password',
                                elementPlaceholder: 'Your Password..',
                                elementLabel: 'Password',
                                renderLabel: false,
                                isRequired: true
                            }
                        ]"
                        formId="mobileform-login"
                        formClass='mobileform__login'
                        formButton='Log In'
                        formButtonClass='btn btn--action'
                        formErrorMessage='Incorrect password or email'
                        :formShowErrorMessage='true'
                        @failure="mobileLoginFailure"
                        @success="mobileLoginSuccess"
                    />

                </section>
            </template>
            <template v-else>
                <h3 class="dropdown__subheadline">Welcome, {{ this.$root.shop.customer.customerName }} ! </h3>
            </template>

        </section>
        <!-- END USER DROPDOWN -->

        <!-- START SEARCH DROPDOWN -->
        <section v-if="elements.dropdownsearch" class="dropdown" ref="dropdown-search">
            
            <v-input
                elementType="text"
                elementName="mobile-search"
                :renderLabel="false"
                placeholder="Search.."
                iconAfter="fa fa-search"
                :iconAfterIsClickable="true"
                iconAfterStyle="inner"
                :isSearch="true"
            />

        </section>
        <!-- END SEARCH DROPDOWN -->

    </section>
        
</template>

<script>

    import { EventBus } from "@/event-bus";

    export default {
        components: {
            'v-input' : () => import('@/components/entities/entity.input.vue'),
            'v-form' : () => import('@/components/entities/entity.form.vue')
        },
        data() {
            return {
                elements: {
                    offcanvasright  : false,
                    offcanvasleft   : false,
                    dropdownsearch  : false,
                    dropdownuser    : false
                },
                basketitems: []
            }
        },
        mounted() {

            this.update();

            EventBus.$on('currency-change', () => {
                this.update();
            });
            EventBus.$on('add-to-basket', () => {
                this.update();
            });
            EventBus.$on('offcanvas-close', () => {

                this.close('offcanvasright');
                this.close('offcanvasleft');
                
            });

            this.$nextTick(function(){
                let self = this;
                window.addEventListener('orientationchange', function(){
                    self.reset();
                });
            }); 
            
        },
        methods: {
            update() {
                let currency = this.$root.shop.settings.currency;
                let symbol = this.$root.currencies[currency].symbol;
                let items = this.$root.shop.basket.items;
                    items.map(line => {
                        let currentprice = line.productSalesPrices.find(x => x.currency == currency);
                        line['lineprice'] = symbol + (currentprice.tagPrice * line.quantity).toFixed(2);
                        return line;
                    });

                this.basketitems = items;
            },  
            reset(ex) {
                for(let key in this.elements) {
                    if(key !== ex) {
                        this.elements[key] = false;
                    }
                }
            },
            close(key) {

                if(this.$refs.hasOwnProperty(key) === false) {
                    return false;
                }

                let self = this;
                this.$refs[key].classList += " closing";

                let Timeout = setTimeout(function(){
                    self.reset();
                }, 400);

            },

            /*
            Callbacks
            */
            removeLine(i) {
                EventBus.$emit('basket-empty', {id: i, line: null});
            },
            emptyBasket() {
                EventBus.$emit('basket-empty');
            },
            mobileLoginFailure(message) {
                console.log('Mobile login: Validation Failure');
            },
            mobileLoginSuccess(data) {
                EventBus.$emit('open-popup', {
                    msg: `If this was a real app, you would be logged in! The validation has passed.`
                });
            }
        }
    }

</script>