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
                <section class="offcanvas__body">
                    
                    Offcanvas Content   

                </section>
            </section>
            <section @click="close('offcanvasright')" class="offcanvas__blank"></section>
        </section>
        <!-- END RIGHT OFFCANVAS -->

        <!-- START USER DROPDOWN -->
        <section v-if="elements.dropdownuser" class="dropdown" ref="dropdown-user">
        
            <template v-if="this.$root.$data.settings.customer.isCustomerLoggedIn == false">
                <section class="mobile-login">
                    <h3 class="dropdown__subheadline">Log in</h3>
                    <v-input
                        identifier="m-login"
                        name="m-login"
                        type="email"
                        :plain="true"
                        placeholder="Your email"
                        iconBefore="fa fa-user"
                        iconBeforeStyle="outer"
                        :validateOnSubmit="true"
                    />
                    <v-input
                        identifier="m-pass"
                        name="m-pass"
                        type="password"
                        :plain="true"
                        placeholder="Your password"
                        iconBefore="fa fa-lock"
                        iconBeforeStyle="outer"
                        :validateOnSubmit="false"
                    />
                </section>
            </template>
            <template v-else>
                <h3 class="dropdown__subheadline">Welcome, {{ this.$root.$data.settings.customer.customerName }} ! </h3>
            </template>

        </section>
        <!-- END USER DROPDOWN -->

        <!-- START SEARCH DROPDOWN -->
        <section v-if="elements.dropdownsearch" class="dropdown" ref="dropdown-search">
            
            <v-input
                identifier="mobile-search"
                type="text"
                :plain="true"
                name="mobile-search"
                iconAfter="fa fa-search"
                classname="dropdown__input input--search"
                placeholder="Search..."
                :isSearch="true"
            />

        </section>
        <!-- END SEARCH DROPDOWN -->

    </section>
        
</template>

<script>

    export default {
        components: {
            'v-input' : () => import('@/components/entities/entity.input.vue')
        },
        data() {
            return {
                elements: {
                    offcanvasright  : false,
                    offcanvasleft   : false,
                    dropdownsearch  : false,
                    dropdownuser    : false
                }
            }
        },
        mounted() {

            this.$nextTick(function(){
                
                let self = this;

                window.addEventListener('orientationchange', function(){
                    self.reset();
                });

            }); 
            
        },
        methods: {
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

            }
        }
    }

</script>