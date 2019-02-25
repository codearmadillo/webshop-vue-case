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
                <span class="menu__link" @click="reset('offcanvasright'); elements.offcanvasright = !elements.offcanvasright">
                    <i class="fa fa-shopping-cart"></i>
                </span>
            </nav>
        </div>

        <!-- START LEFT OFFCANVAS -->
        <section v-if="elements.offcanvasleft" class="offcanvas offcanvas--left" ref="offcanvasleft">
            <section class="offcanvas__content">
                <span class="offcanvas__close" @click="close('offcanvasleft')"></span>
                <header class="offcanvas__header">Menu</header>
                <section class="offcanvas__body">
                    
                    Offcanvas Content

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
                        <article v-for="line in basketitems" class="offcanvas-basket__line">
                            <span class="line__image">
                                <img :src="line.productVariantImage" :alt="line.productName" />
                            </span>
                            <span class="line__description">
                                {{ line.size + ' ' + line.productName }}
                            </span>
                            <span class="line__quantity">
                                {{ line.quantity }}
                            </span>
                            <span class="line__price">
                                {{ line.lineprice }}
                            </span>
                        </article>  
                    </template>
                    

                </section>
                <section class="offcanvas__footer offcanvas__basket-footer">
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
            mobileLoginFailure(message) {
                console.log('Mobile login: Validation Failure');
            },
            mobileLoginSuccess(data) {
                console.log('Mobile login: Validation Passed');
                console.log('Mobile login: Postback');
            }
        }
    }

</script>