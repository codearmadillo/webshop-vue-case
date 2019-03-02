<template>
  <div class="shop-content signup__wrapper">
    <section class="signup__login">
        <form-login
            formId="form-login"
            formHeader="Sign in"
            formFooter="<a href='/forgotten-password' title='Forgotten password'>Forgot your Password <i class='fa fa-arrow-right'></i></a>"
            :formElements="[
                {
                    elementType: 'email',
                    elementName: 'login-email',
                    elementPlaceholder: 'Your Email..',
                    elementLabel: 'Email',
                    renderLabel: false,
                    isRequired: true
                },
                {
                    elementType: 'password',
                    elementName: 'login-password',
                    elementPlaceholder: 'Your password..',
                    elementLabel: 'Password',
                    renderLabel: false,
                    isRequired: true
                }
            ]"
            formButton="Sign in"
            formButtonClass="btn btn--action"
            :formShowErrorMessage="true"
            formErrorMessage="Incorrect username or password"
            @failure="failureLogin"
            @success="successLogin"
        />
    </section>
    <section class="signup__register">
        <form-signup
            formId="form-signup"
            formHeader="Register"
            formFooter="By clicking 'Create account', you agree to our <a href='/privacy-policy' title='Privacy policy'>Privacy Policy <i class='fa fa-arrow-right'></i></a>"
            :formElements="[
                {
                    elementType: 'email',
                    elementName: 'signup-email',
                    elementPlaceholder: 'Your Email..',
                    elementLabel: 'Email',
                    renderLabel: false,
                    isRequired: true
                },
                {
                    elementType: 'password',
                    elementName: 'signup-password',
                    elementPlaceholder: 'Your password..',
                    elementLabel: 'Password',
                    renderLabel: false,
                    isRequired: true
                },
                {
                    elementType: 'password',
                    elementName: 'signup-confirm',
                    elementPlaceholder: 'Confirm password..',
                    elementLabel: 'Repeat password',
                    renderLabel: false,
                    isRequired: true,
                    matchWith: 1
                },
                {
                    elementType: 'checkbox',
                    elementName: 'signup-newsletter',
                    elementLabel: 'Sign up for exclusive updates, discounts, new arrivals, contents, and more.',
                    isRequired: false
                }
            ]"
            formButton="Create account"
            formButtonClass="btn btn--default"
            :formShowErrorMessage="true"
            formErrorMessage="It seems that the required fields are not filled properly."
            @failure="failureRegister"
            @success="successRegister"
        />
    </section>
  </div>
</template>

<script>

    import VForm from '@/components/entities/entity.form.vue';
    import { EventBus } from "@/event-bus";

    export default {
        components: {
            'form-signup': VForm,
            'form-login': VForm
        },
        methods: {
            failureRegister(event) {
                console.log('signup error');
            },
            successRegister(event) {
                EventBus.$emit('open-popup', {
                    msg: `If this was a real app, you would have an account! The validation has passed.`
                });
            },
            failureLogin(event) {
                console.log('login error');
            },
            successLogin(event) {
                EventBus.$emit('open-popup', {
                    msg: `If this was a real app, you would be logged in! The validation has passed.`
                });
            }
        }
    }

</script>
