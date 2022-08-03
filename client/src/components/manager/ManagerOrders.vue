<template>
  <div class="row">
    <div class="col-xs-12" id="customer_sidebar">
      <h1 class="title-detail h3">Quản lý tất cả đơn hàng</h1>
      <div
        class="col-xs-12 customer-table-wrap content-entry"
        id="customer_orders"
      >
        <div class="customer_order customer-table-bg">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th class="order_number text-center">Đơn hàng</th>
                  <th class="date text-right">Người nhận</th>
                  <th class="total text-right">Địa chỉ</th>
                  <th class="payment_status text-center">Vận chuyển</th>
                  <th class="payment_status text-center">Trạng thái</th>
                  <th class="fulfillment_status text-center">chi tiết</th>
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
                  <td class="text-right">
                    <span>{{ order.fullName }}</span>
                  </td>
                  <td class="text-right">
                    <span class="total money">{{ order.address }}</span>
                  </td>
                  <td class="text-center">
                    <span class="status_paid">{{ order.shippingStatus }}</span>
                  </td>
                  <td class="text-center">
                    <span class="status_paid">{{
                      order.completed ? "Hoàn thành" : "chưa Hoàn thành"
                    }}</span>
                  </td>

                  <td class="text-center">
                    <span class="status_fulfilled" data-note="">Chi tiết</span>
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
//import { useStore } from "vuex";
import { ref } from "vue";
import { toMoneyString } from "../../helpers/utils.js";
import axios from "axios";
import url from "../../api/url.js";
export default {
  name: "manager-orders-template",
  setup() {
    //const store = useStore();

    const orders = ref(); //= computed(() => store.getters["orders/getOrders"]);
    function getOrders() {
      axios
        .get(url.managerOrders)
        .then((response) => {
          orders.value = response.data.itemOrders;
          console.log("response:", orders.value);
        })
        .catch((error) => {
          console.log("getOrders:", error);
        });
    }

    getOrders();
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
