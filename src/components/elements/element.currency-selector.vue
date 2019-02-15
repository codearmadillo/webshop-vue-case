<template>  
    <span class="currency-selector" create-pseudoselector="true">
        <label class="selector__label" for="selectShopCurrency">Currency:</label>
        <select class="selector__option-list" id="selectShopCurrency">
            <option selected value="gbp">GBP</option>
            <option value="eur">EUR</option>
            <option value="usd">USD</option>
        </select>
    </span>
</template>

<script>

    export default {}

</script>