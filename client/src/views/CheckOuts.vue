<template>
  <div class="flexbox">
    <div class="content">
      <div class="wrap">
        <div class="sidebar" v-if="!isOrderSucceeded">
          <div class="sidebar-content">
            <div class="order-summary order-summary-is-collapsed">
              <h2 class="visually-hidden">Thông tin đơn hàng</h2>
              <div class="order-summary-sections">
                <div
                  class="order-summary-section order-summary-section-product-list"
                >
                  <table class="product-table">
                    <thead>
                      <tr>
                        <th scope="col">
                          <span class="visually-hidden">Hình ảnh</span>
                        </th>
                        <th scope="col">
                          <span class="visually-hidden">Mô tả</span>
                        </th>
                        <th scope="col">
                          <span class="visually-hidden">Số lượng</span>
                        </th>
                        <th scope="col">
                          <span class="visually-hidden">Giá</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <ProductThumbnailTemplate
                        v-for="(product, index) in checkoutProducts"
                        :key="index"
                        :item="product"
                      />
                    </tbody>
                  </table>
                </div>
                <div
                  class="order-summary-section order-summary-section-total-lines payment-lines"
                  data-order-summary-section="payment-lines"
                >
                  <table class="total-line-table">
                    <thead>
                      <tr>
                        <th scope="col">
                          <span class="visually-hidden">Mô tả</span>
                        </th>
                        <th scope="col">
                          <span class="visually-hidden">Giá</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="total-line total-line-subtotal">
                        <td class="total-line-name">Tạm tính</td>
                        <td class="total-line-price">
                          <span
                            class="order-summary-emphasis"
                            data-checkout-subtotal-price-target="100200000"
                          >
                            {{ toMoneyString(totalMoney) }}
                          </span>
                        </td>
                      </tr>

                      <tr class="total-line total-line-shipping">
                        <td class="total-line-name">Phí vận chuyển</td>
                        <td class="total-line-price">
                          <span
                            class="order-summary-emphasis"
                            data-checkout-total-shipping-target="4000000"
                          >
                            {{ toMoneyString(moneyShipping) }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot class="total-line-table-footer">
                      <tr class="total-line">
                        <td class="total-line-name payment-due-label">
                          <span class="payment-due-label-total">Tổng cộng</span>
                        </td>
                        <td class="total-line-name payment-due">
                          <span class="payment-due-currency">VND</span>
                          <span
                            class="payment-due-price"
                            data-checkout-payment-due-target="104200000"
                          >
                            {{ toMoneyString(paymentDuePrice) }}
                          </span>

                          <span
                            class="checkout_version"
                            display:none=""
                            data_checkout_version="39"
                          >
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CheckOutsLeftTemplate
          :address="addressDefault"
          v-if="!isOrderSucceeded"
          @handleOrder="(data) => handleOrder(data)"
        />
        <CheckOutSuccessTemplate
          :info="infoOrder"
          :indexCode="indexCode"
          v-if="isOrderSucceeded"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ProductThumbnailTemplate from "../components/checkouts/ProductThumbnail.vue";
import CheckOutsLeftTemplate from "../components/checkouts/CheckOutsLeft.vue";
import CheckOutSuccessTemplate from "../components/checkouts/CheckOutSuccess.vue";
import { toMoneyString } from "../helpers/utils.js";
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  name: "checkouts-template",
  components: {
    ProductThumbnailTemplate,
    CheckOutsLeftTemplate,
    CheckOutSuccessTemplate,
  },
  setup() {
    const indexCode = ref(0);
    const isOrderSucceeded = ref(false);
    const store = useStore();
    const moneyShipping = ref(40000);
    const infoOrder = ref({});
    const addressDefault = computed(
      () => store.getters["user/getAddressDefault"]
    );

    const checkoutProducts = computed(() => store.getters["cart/getAllItems"]);
    const totalMoney = computed(() => store.getters["cart/getTotalMoney"]);
    const paymentDuePrice = computed(
      () => totalMoney.value + moneyShipping.value
    );

    function handleOrder(data) {
      store
        .dispatch("orders/createOrder", {
          ...data,
          shippingMoney: 40000,
        })
        .then((index) => {
          console.log("handleOrder mã index", index);
          indexCode.value = index;
          isOrderSucceeded.value = true;
          infoOrder.value = data;
          store.dispatch("cart/emptyCart");
        })
        .catch((error) => console.log("handleOrder", error));
    }

    return {
      indexCode,
      infoOrder,
      isOrderSucceeded,
      checkoutProducts,
      totalMoney,
      moneyShipping,
      paymentDuePrice,
      addressDefault,
      toMoneyString,
      handleOrder,
    };
  },
};
</script>
<style scoped>
/* .sidebar:after {
  content: "";
  display: block;
  width: 300%;
  position: absolute;
  top: 0;
  left: -100%;
  bottom: 0;
  background: #fafafa;
  z-index: -1;
  box-shadow: 0 -1px 0 #e1e1e1 inset;
} */
.sidebar {
  left: 0;
  background-position: left top;
  box-shadow: 1px 0 0 #e1e1e1 inset;
}
.flexbox .content,
.flexbox .content .wrap,
.flexbox .main {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-flex: 1 0 auto;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
}
.flexbox .content .wrap {
  -webkit-flex-direction: row-reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
}
.content {
  overflow-x: hidden;
}
.wrap {
  margin: 0 auto;
  max-width: 40em;
  zoom: 1;
}
.wrap {
  padding: 0 5%;
  width: 90%;
  max-width: 78.57143em;
}

.sidebar {
  position: relative;
  color: #717171;
}
.sidebar {
  width: 38%;
  padding-left: 4%;
  background-position: left top;
  /* float: right; */
}
.main,
.sidebar {
  padding-top: 4em;
}
.visually-hidden {
  border: 0;
  clip: rect(0, 0, 0, 0);
  clip: rect(0 0 0 0);
  width: 2px;
  height: 2px;
  margin: -2px;
  overflow: hidden;
  padding: 0;
  position: absolute;
}
.sidebar h2 {
  color: #323232;
}
.sidebar
  .sidebar-content
  .order-summary
  .order-summary-sections
  .order-summary-section {
  border-top: 1px solid;
  padding-top: 1.5em;
  padding-bottom: 1em;
  border-color: #e1e1e1;
}
.sidebar
  .sidebar-content
  .order-summary
  .order-summary-sections
  .order-summary-section:first-child {
  border-top: none;
}
.sidebar
  .sidebar-content
  .order-summary
  .order-summary-sections
  .order-summary-section:first-child {
  padding-top: 0;
}
td,
th {
  padding: 0;
  padding-left: 1em;
}
td:first-child,
th:first-child {
  padding-left: 0;
  text-align: left;
}
td:last-child,
th:last-child {
  text-align: right;
}
.order-summary-section.order-summary-section-total-lines.payment-lines[data-order-summary-section="payment-lines"] {
  padding-top: 1em !important;
}
.sidebar
  .sidebar-content
  .order-summary
  .order-summary-sections
  .order-summary-section {
  border-top: 1px solid;
  padding-top: 1.5em;
  padding-bottom: 1em;
  border-color: #e1e1e1;
}

.total-line td {
  padding-top: 0.75em;
}
.sidebar .sidebar-content .order-summary .order-summary-emphasis {
  font-weight: 500;
  color: #4b4b4b;
}
.total-line-table-footer {
  white-space: nowrap;
}
.total-line-table-footer .total-line td {
  padding-top: 3em;
  position: relative;
}
.total-line-table-footer .total-line td::before {
  background-color: #e1e1e1;
  content: "";
  position: absolute;
  top: 1.5em;
  left: 0;
  width: 100%;
  height: 1px;
}
.payment-due-label .payment-due-label-total {
  font-size: 1.14286em;
  color: #4b4b4b;
}
.payment-due .payment-due-currency {
  font-size: 0.85714em;
  vertical-align: 0.2em;
  margin-right: 0.5em;
  color: #969696;
}
.payment-due .payment-due-price {
  font-size: 1.71429em;
  font-weight: 500;
  letter-spacing: -0.04em;
  color: #4b4b4b;
  line-height: 1em;
}
</style>
