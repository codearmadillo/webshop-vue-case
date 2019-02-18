<template>
  <div class="shop-content">

    <!--
    <button class="btn btn--default">Create account</button><br/>
    <button class="btn btn--action">Sign in</button><br/>
    <button class="btn btn--default"><i class="fa fa-shopping-cart"></i> Add to cart</button><br/><br/>
    -->

    <!--
    <label>
      <span>Size</span>
      <span class="selectbox">
        <select>
          <option disabled selected>Select Colour</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="pink">Pink</option>
          <option value="honey">Honey</option>
        </select>
      </span>
    </label>
    -->

    <!--

    <div>
      <span>
         <v-input
          @submit='submitted'
          v-model="Case1"
          elementType='text'
          elementName='case-1'
          elementId='case-1'
          elementPlaceholder='Placeholder 1'
          elementLabel='I am first label'
         />
      </span>
      <span>
        {{ Case1 }}
      </span>
    </div>

    <div>
      <span>
        <v-input
          @submit='submitted'
          v-model="Case2"
          elementType='password'
          elementName='case-2'
          elementLabel='I am second label'
          iconBefore='fa fa-lock'
          iconBeforeStyle='inner'
         />
      </span>
      <span>
        {{ Case2 }}
      </span>
    </div>

    <div>
      <span>
        <v-input
          @submit='submitted'
          v-model="Case3"
          elementType='email'
          elementName='case-3'
          elementId='case-3'
          iconBefore='fa fa-envelope'
          iconBeforeStyle='outer'
         />
      </span>
      <span>
        {{ Case3 }}
      </span>
    </div>

    <div>
      <span>
        <v-input
          @submit='submitted'
          v-model="Case4"
          elementType='search'
          elementName='case-4'
          elementId='case-4'
          iconAfter='fa fa-search'
          iconAfterStyle='inner'
          :iconAfterIsClickable='true'
          :renderLabel='false'
         />
      </span>
      <span>
        {{ Case4 }}
      </span>
    </div>

    <div>
      <span>
        <v-input
          @submit='submitted'
          v-model="Case5"
          elementType='number'
          elementName='case-5'
          :numberStepper='2'
          iconBefore='fa fa-baby-carriage'
          iconBeforeStyle='inner'
          :iconBeforeIsClickable='true'
          elementPresetValue='3'
         />
      </span>
      <span>
        {{ Case5 }}
      </span>
    </div>

    <div>
      <span>
        <v-input
          @submit='submitted'
          v-model="Case6"
          elementType='select'
          elementName='case-6'
          elementId='case-6'
          :options="[
            {key: 'audi',value:'Audi'},
            {key: 'mercedes',value:'Mercedes'}
          ]"
          :renderLabel='false'
         />
      </span>
      <span>
        {{ Case6 }}
      </span>
    </div>

    <div>
      <span>
        <v-input
          @submit='submitted'
          v-model="Case7"
          elementType='select'
          elementName='case-7'
          :options="[
            {key: 'null',value:'Choose car',disabled: true, selected: true},
            {key: 'audi',value:'Audi'},
            {key: 'mercedes',value:'Mercedes', disabled: true}
          ]"
         />
      </span>
      <span>
        {{ Case7 }}
      </span>
    </div>

    <div>
      <span>
        <v-input
          @submit='submitted'
          v-model="Case8"
          elementType='select'
          elementName='case-8'
         />
      </span>
      <span>
        {{ Case8 }}
      </span>
    </div>

    <div>
      <span>
        <v-input
          v-model="Case9"
          elementType='checkbox'
          elementName='case-9'
          elementId='case-9'
          @submit='submitted'
         />
      </span>
      <span>
        {{ Case9 }}
      </span>
    </div>

    -->

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
          elementType: 'checkbox',
          elementName: 'rules-and-conditions',
          elementLabel: 'I accept rules and conditions',
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
  data() {
    return {
      'Case1' : null,
      'Case2' : null,
      'Case3' : null,
      'Case4' : null,
      'Case5' : null,
      'Case6' : null,
      'Case7' : null,
      'Case8' : null,
      'Case9' : null
    }
  },
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
