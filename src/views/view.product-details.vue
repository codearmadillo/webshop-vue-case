<template>
  <div class="shop-content">
    Product details
  </div>
</template>

<script>

export default {
  props: {

    /*

    The 'variants' prop contains objects in this format:
    {
      colour:     <String> Colour Name
      hex:        <String> Colour Hex
      size:       <String> Size (e.g. XS),
      stockbound: <Boolean> Has separate stock level?
      stocklevel: <Number> Stock level
    }

    */

    id: {
      type: Number,
      required: true
    },
    code: {
      type: Number,
      required: true
    },

    name: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: false
    },
    stocklevel: {
      type: Number,
      required: true
    },
    slug: {
      type: String,
      required: true
    },

    shortDescription: {
      type: String,
      required: false
    },
    longDescription: {
      type: String,
      required: false
    },

    productVideos: {
      type: Array,
      required: false
    },
    productImages: {
      type: Array,
      required: false
    },

    variants: {
      type: Array,
      required: false
    }

    specs: {
      type: Array,
      required: false
    }
    
    tagPrice: {
      type: Number,
      required: true
    },
    hasPreviousTagPrice: {
      type: Boolean,
      required: false,
      default: false
    },
    previousTagPrice: {
      type: Number,
      required: false
    }

    hasDefaultDeliveryAndReturnTerms: {
      type: Boolean,
      required: false,
      default: false
    },
    deliveryTerms: {
      type: String,
      required: false
    },
    returnTerms: {
      type: String,
      required: false
    }
  }
}

</script>
