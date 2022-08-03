<template>
  <section class="pd-top-60">
    <div class="container">
      <div class="tab-pane-show">
        <div class="d-flex d-flex-wrap row-left-list">
          <ProductTemplate
            v-for="(product, index) in allProduct"
            :key="index"
            :product="product"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import ProductTemplate from "../components/product/ProductTemplate.vue";
import axios from "axios";
import url from "../api/url.js";

export default {
  name: "collection-page",
  components: { ProductTemplate },
  setup() {
    const store = useStore();
    const route = useRoute();
    const allProduct = ref([]);

    function getProductByType(type) {
      console.log("getProductByType:", type);
      store.dispatch("setLoading", true);

      axios
        .get(`${url.collections}/${type}`)
        .then((response) => {
          console.log("getProductByType:", response.data.products);
          allProduct.value = response.data.products;
          store.dispatch("setLoading", false);
        })
        .catch((error) => {
          store.dispatch("setLoading", false);
          console.error("getProductByType", error);
        });
    }

    watch(
      () => route.params.type,
      (newStyle) => {
        //console.log("type", newStyle);
        allProduct.value = [];
        getProductByType(newStyle !== "all" ? newStyle : "");
      }
    );

    getProductByType(route.params.type !== "all" ? route.params.type : "");
    return { allProduct };
  },
};
</script>
