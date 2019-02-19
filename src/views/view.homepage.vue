<template>
  <div class="shop-content">

    <v-form
      formHeader="Sign up now!"
      formFooter="It's free!"
      :formElements="[
        {
          elementType: 'email',
          elementName: 'email',
          elementPlaceholder: 'Your email',
          elementLabel: 'Email',
          isRequired: true
        },
        {
          elementType: 'password',
          elementName: 'password',
          elementPlaceholder: 'Your password',
          elementLabel: 'Password',
          isRequired: true,
          iconBefore: 'fa fa-lock'
        },
        {
          elementType: 'text',
          elementName: 'name',
          elementPlaceholder: 'Your name',
          elementLabel: 'Your name',
          isRequired: false
        },
        {
          elementType: 'password',
          elementName: 'password-repeat',
          elementPlaceholder: 'Your password',
          elementLabel: 'Password',
          isRequired: true,
          iconAfter: 'fa fa-lock',
          iconAfterStyle: 'outer'
        },
        {
          elementType: 'number',
          elementName: 'age',
          elementPlaceholder: '0',
          elementLabel: 'Number',
          isRequired: false
        },
        {
          elementType: 'checkbox',
          elementName: 'rules-and-conditions',
          elementLabel: 'I accept rules and conditions',
          isRequired: true
        },
        {
          elementType: 'select',
          elementName: 'favourite-car',
          elementLabel: 'What car do you prefer?',
          elementClassname: 'car-select',
          options: [
            {
              key: null, value: 'Choose your car', selected: true, disabled: true
            },
            {
              key: 'audi', value: 'Audi'
            },
            {
              key: 'mclaren', value: 'McLaren'
            }
          ],
          isRequired: true
        }
      ]"
      formButton="Sign up"
      formButtonClass="btn btn--default"
      @failure="failure"
      @success="success"
    />
  </div>
</template>

<script>

export default {
  components: {
    'v-form' : () => import('@/components/entities/entity.form.vue'),
    'v-input' : () => import('@/components/entities/entity.input.vue')
  },
  methods: {
    failure() {
      console.log('Something went wrong');
    },
    success(data) {
      console.log('Success!');
      console.log(data);
    }
  }
}

</script>
