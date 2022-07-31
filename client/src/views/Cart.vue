<template>
  <div>
    <div style="width: 100%; height: 20px; padding-top: 40px"></div>
    <section
      id="cart-template"
      class="pd-top-30 cart-page"
      style="background-color: #fff"
    >
      <div class="container">
        <div>
          <div class="row d-flex">
            <div class="col-xs-12 col-lg-9 col-md-8 col-sm-7 mg-bottom-15">
              <div class="cart-title">
                <h2>Giỏ hàng:</h2>
                <span class="cart-count">
                  <span class="cart-counter">{{ totalItemsCart }}</span>
                  <span class="cart-item-title">Sản phẩm</span>
                </span>
              </div>
              <div class="item-wrap" id="cart-page-result">
                <CartWrapTemplate
                  v-for="(item, index) in items"
                  :key="index"
                  :item="item"
                />
              </div>
            </div>
            <div class="col-xs-12 col-lg-3 col-md-4 col-sm-5">
              <CartRightTemplate />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import CartWrapTemplate from "../components/cart/CartWrapTemplate.vue";
import CartRightTemplate from "../components/cart/CartRightTemplate.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "cart-template",
  components: { CartWrapTemplate, CartRightTemplate },
  setup() {
    const store = useStore();

    const items = computed(() => store.getters["cart/getAllItems"]);
    const totalItemsCart = computed(() => store.getters["cart/getTotalItems"]);

    function getItemCarts() {
      store
        .dispatch("cart/getItemCarts")
        .then((items) => {
          console.log("getItemCarts", items);
          store.dispatch("setLoading", false);
        })
        .catch((err) => {
          store.dispatch("setLoading", false);
          console.log("getItemCarts", err);
        });
    }
    getItemCarts();

    return { items, totalItemsCart };
  },
};
</script>
<style scoped>
.cart-page .cart-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.cart-page .cart-title h2 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}
.cart-page .cart-title .cart-count {
  border-bottom: 1px solid #000;
}
</style>
