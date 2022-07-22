<template>
  <div class="d-flex d-flex-wrap row-left-list">
    <ProductTemplate
      v-for="(product, index) in allProduct"
      :key="index"
      :product="product"
    />
  </div>
</template>
<script>
import ProductTemplate from "./ProductTemplate.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "list-product-template",
  components: { ProductTemplate },
  setup() {
    const store = useStore();
    const allProduct = computed(() => store.getters["products/getAllProducts"]);

    return { allProduct };
  },
};
</script>
