<template>
  <div class="row">
    <div class="col-xs-12" id="customer_sidebar">
      <h1 class="title-detail h3">Chi tiết đơn hàng</h1>
      <h4 class="name-order">
        Đơn hàng: <strong>#{{ order.index }}</strong
        >,
        <span class="order_date">{{ order.createdAt }}</span>
      </h4>

      <div class="list-infomation">
        <table>
          <tbody>
            <tr>
              <td><strong>Họ tên: </strong></td>
              <td>{{ order.fullName }}</td>
            </tr>
            <tr>
              <td><strong>Số điện thoại: </strong></td>
              <td>{{ order.phone }}</td>
            </tr>
            <tr>
              <td><strong>Địa chỉ: </strong></td>
              <td>
                {{ order.address }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="col-xs-12 customer-table-wrap content-entry"
        id="customer_orders"
        style="margin-top: 25px"
      >
        <div class="customer_order customer-table-bg">
          <div class="table-responsive">
            <table id="order_details" class="table tableOrder">
              <thead>
                <tr>
                  <th class=""></th>
                  <th class="">Sản phẩm</th>
                  <th class="text-center">Đơn giá</th>
                  <th class="text-center">Số lượng</th>
                  <th class="total text-right">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(productOrder, index) in order.productOrders"
                  :key="index"
                >
                  <td class="order-image">
                    <router-link
                      :to="{
                        name: 'ProductDetails',
                        params: { slug: productOrder.product.slug },
                      }"
                    >
                      <img
                        :src="`data:${productOrder.color.image.img.contentType};base64,${productOrder.color.image.img.data}`"
                        :alt="productOrder.color.image.name"
                      />
                    </router-link>
                  </td>
                  <td class="" style="max-width: 300px">
                    <router-link
                      :to="{
                        name: 'ProductDetails',
                        params: { slug: productOrder.product.slug },
                      }"
                    >
                      {{ productOrder.product.name }}
                    </router-link>

                    <br />
                    <span class="variant_acc">
                      {{ productOrder.color.name }} / {{ productOrder.size }}
                    </span>
                  </td>
                  <td class="money text-center">
                    {{ toMoneyString(productOrder.price) }}
                  </td>
                  <td class="quantity center text-center">
                    {{ productOrder.quantity }}
                  </td>
                  <td class="total money text-right">
                    {{
                      toMoneyString(productOrder.quantity * productOrder.price)
                    }}
                  </td>
                </tr>

                <tr class="order_summary order_border">
                  <td class="text-left" colspan="4"><b>Giá sản phẩm</b></td>
                  <td class="total money text-right">
                    <b>{{ toMoneyString(order.totalMoney) }}</b>
                  </td>
                </tr>

                <tr class="order_summary">
                  <td class="text-left" colspan="4">
                    <b>Giao hàng tận nơi</b>
                  </td>
                  <td class="total money text-right">
                    <b>{{ toMoneyString(order.shippingMoney) }}</b>
                  </td>
                </tr>

                <tr class="order_summary order_total">
                  <td class="text-left" colspan="4"><b>Tổng tiền</b></td>
                  <td class="total money text-right">
                    <b
                      >{{
                        toMoneyString(order.shippingMoney + order.totalMoney)
                      }}
                    </b>
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
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
//import { computed } from "vue";
import { toMoneyString } from "../../helpers/utils.js";
export default {
  name: "order-template",
  setup() {
    const store = useStore();
    const route = useRoute();
    const order = ref({});

    store
      .dispatch("orders/getOrdersById", route.params.id)
      .then((orderResponse) => {
        console.log("getOrdersById", orderResponse);
        order.value = orderResponse;
      })
      .catch((error) => console.log("getOrdersById", error));

    return { order, toMoneyString };
  },
};
</script>
<style scoped>
.name-order {
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
}
.order_date {
  font-weight: normal;
  font-size: 14px;
  text-transform: none;
}
table tr td,
table tr th {
  padding: 10px;
  text-align: left;
}
.list-infomation td {
  border: none;
}
table tr td:first-child,
table tr th:first-child {
  padding-left: 0;
}
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
#customer_orders table tr td {
  vertical-align: middle;
  border-top: none;
  font-size: 14px;
  line-height: 21px;
}
#customer_orders table tr td.order-image {
  width: 70px;
}
.text-right {
  text-align: right !important;
}
</style>
