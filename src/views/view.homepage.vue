<template>
  <div class="shop-content">
    <span>Buttons</span><br/>
    <button class="btn btn--default">Create account</button><br/>
    <button class="btn btn--action">Sign in</button><br/>
    <button class="btn btn--default"><i class="fa fa-shopping-cart"></i> Add to cart</button><br/><br/>

    <span>Inputs</span><br/>
    <label>
      <span></span>
      <input type="text" value="Text">
    </label>
    <label>
      <span></span>
      <input class="error" type="email" value="Email"><br/>
    </label>
    <label>
      <span></span>
      <input type="Password" placeholder="Password"><br/>
    </label>
    <label>
      <span>Some number</span>
      <input type="Number" value="1"><br>
    </label>
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
    
    <span class="checkbox">
      <input type="checkbox" name="hello" id="hello" />
      <label for="hello">
        Sign up for exclusives updates, discounts, new arrivals, contests, and more!
      </label>
    </span>
  </div>
</template>

<script>

export default {}

</script>
