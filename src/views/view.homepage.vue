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

    <v-input
      identifier="name"
      type="text"
      placeholder="First name"
      name="iname-name"
    />

    <v-input
      identifier="email"
      type="email"
      label="Email"
      placeholder="Your email"
      value="jiri0042@edu.eal.dk"
      classname="error"
      name="iname-email"
    />
    
    <v-input
      identifier="password"
      type="password"
      placeholder="Password"
      name="iname-pass"
    />

    <v-input
      identifier="number"
      type="number"
      label="A number"
      value="23"
      name="iname-num"
    />

    <v-input
      identifier="checkbox"
      type="checkbox"
      label="Sign up for exclusives updates, discounts, new arrivals, contests, and more!"
      name="iname-check"
    />

    <v-input
      identifier="select"
      type="select"
      label="Size"
      name="iname-size"
      :options="[
          {key: 'none', value: 'Choose size', disabled: true, selected: true},
          {key: 'xs', value: 'Size XS'},
          {key: 's', value: 'Size S'},
          {key: 'm', value: 'Size M'},
          {key: 'l', value: 'Size L'}
        ]"
    />

    <v-input
      identifier="searchtest"
      type="text"
      :plain="true"
      name="iname-search"
      iconBefore="fa fa-user"
      iconBeforeStyle="outer"
      iconAfter="fa fa-search"
      classname="testname"
    />
    
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
    
  </div>
</template>

<script>

export default {
  components: {
    'v-input' : () => import('@/components/entities/entity.input.vue')
  }
}

</script>
