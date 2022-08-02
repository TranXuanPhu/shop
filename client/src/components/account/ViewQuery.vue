<template>
  <div class="row">
    <div class="col-xs-12" id="customer_sidebar">
      <h1 class="title-detail h3">Quản lý đơn hàng</h1>
      <div
        class="col-xs-12 customer-table-wrap content-entry"
        id="customer_orders"
      >
        <div class="customer_order customer-table-bg">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th class="order_number text-center">Mã đơn hàng</th>
                  <th class="date text-center">Ngày đặt</th>
                  <th class="total text-center">Thành tiền</th>
                  <th class="payment_status text-center">
                    Trạng thái thanh toán
                  </th>
                  <th class="fulfillment_status text-center">Vận chuyển</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in orders" :key="index">
                  <td class="text-center">
                    <router-link
                      :to="{ name: 'Orders', params: { id: order._id } }"
                    >
                      #{{ order.index }}
                    </router-link>
                  </td>
                  <td class="text-center">
                    <span>{{ order.createdAt }}</span>
                  </td>
                  <td class="text-center">
                    <span class="total money">{{
                      toMoneyString(order.totalMoney)
                    }}</span>
                  </td>
                  <td class="text-center">
                    <span class="status_paid">{{ order.paymentStatus }}</span>
                  </td>

                  <td class="text-center">
                    <span class="status_fulfilled" data-note="">{{
                      order.shippingStatus
                    }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import { toMoneyString } from "../../helpers/utils.js";
export default {
  name: "view-query-template",
  setup() {
    const route = useRoute();
    const store = useStore();
    console.log("query:", route.query);

    const orders = computed(() => store.getters["orders/getOrders"]);

    store
      .dispatch("orders/getOrders")
      .then((orders) => (orders.value = orders))
      .catch((err) => console.log("getOrder", err));

    return { orders, toMoneyString };
  },
};
</script>
<style scoped>
#customer_orders,
#order_payment,
#order_shipping {
  margin-top: 44px;
  border-radius: 5px;
}
.table-responsive {
  overflow-x: auto;
}
.content-entry table {
  width: auto;
  border-collapse: collapse;
}
#customer_orders table {
  width: 100%;
  background: #fff;
}
#customer_orders table tr {
  height: 25px;
  line-height: 30px;
}
.text-center {
  text-align: center !important;
}
table tr td:first-child,
table tr th:first-child {
  padding-left: 0;
}
#customer_orders table thead tr th {
  font-weight: 600;
  font-size: 14px;
  border: 1px solid #ccc;
  font-weight: bold;
  padding: 10px;
}
#customer_orders table tr {
  height: 25px;
  line-height: 30px;
}
.content-entry table tr td {
  border: 1px solid #ccc !important;
  padding: 7px;
}
#customer_orders table tr td {
  vertical-align: middle;
  border-top: none;
  font-size: 14px;
  line-height: 21px;
}
.content-entry a {
  color: #158ed4;
}
</style>
