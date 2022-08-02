<template>
  <div class="sidebar-checkout">
    <div class="sidebar-order-wrap">
      <div class="order_title">
        <h4>Thông tin đơn hàng</h4>
      </div>
      <div class="order_total">
        <p>
          Tổng tiền:
          <span class="total-price">{{ toMoneyString(totalMoney) }}</span>
        </p>
      </div>
      <div class="order_text">
        <p>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
      </div>
      <!-- <div class="check-bill">
        <div class="checkbox d-flex d-flex-center">
          <input
            type="checkbox"
            id="checkbox-bill"
            value="yes"
            class="regular-checkbox"
          />
          <label for="checkbox-bill" class="title">Xuất hoá đơn</label>
        </div>
        <div class="bill-field">
          <input
            type="text"
            class="form-control dt-width-100 mg-top-10"
            id="company_attr"
            value=""
            placeholder="Tên công ty"
          />
          <input
            type="text"
            class="form-control dt-width-100 mg-top-10"
            id="tax_attr"
            value=""
            placeholder="Mã số thuế"
          />
          <input
            type="text"
            class="form-control dt-width-100 mg-top-10"
            id="address_attr"
            value=""
            placeholder="Địa chỉ công ty"
          />
          <input
            type="text"
            class="form-control dt-width-100 mg-top-10"
            id="name_attr"
            value=""
            placeholder="Người nhận hóa đơn"
          />
        </div>
      </div> -->
      <!-- <div class="checkout-buttons clearfix">
        <label for="note" class="note-label">Ghi chú đơn hàng</label>
        <textarea
          class="form-control"
          id="note"
          name="note"
          rows="4"
          placeholder="Ghi chú"
        ></textarea>
       
      </div> -->
      <div class="order_action">
        <router-link
          :to="{ name: 'CheckOuts' }"
          class="btncart-checkout text-center"
          name="checkout"
        >
          THANH TOÁN NGAY
        </router-link>

        <p class="link-continue text-center">
          <router-link :to="{ name: 'Home' }">
            <i class="fa fa-reply"></i> Tiếp tục mua hàng
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { toMoneyString } from "../../helpers/utils.js";
export default {
  name: "cart-right-template",
  setup() {
    const store = useStore();
    const totalMoney = computed(() => store.getters["cart/getTotalMoney"]);
    return { totalMoney, toMoneyString };
  },
};
</script>
<style scoped>
.sidebar-checkout {
  position: sticky;
  top: 70px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
}
.sidebar-checkout .order_title h4 {
  font-size: 21px;
  font-weight: 600;
  line-height: normal;
}
.sidebar-checkout .order_total {
  padding: 15px 0px;
  border: 1px solid #eee;
  border-left: none;
  border-right: none;
}
.sidebar-checkout .order_title h4 {
  font-size: 21px;
  font-weight: 600;
  line-height: normal;
}
.sidebar-checkout .order_total {
  padding: 15px 0px;
  border: 1px solid #eee;
  border-left: none;
  border-right: none;
}
.sidebar-checkout .order_total p {
  margin: 0;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}
.sidebar-checkout .order_total p span {
  color: #e70303;
  font-weight: bold;
  font-size: 21px;
}
.sidebar-checkout .order_text {
  padding: 15px 0;
}
.sidebar-checkout .order_text p {
  margin: 0;
}
.check-bill {
  margin-bottom: 10px;
}
.check-bill .checkbox {
  cursor: pointer;
}
.check-bill .checkbox input {
  width: 15px;
  height: 15px;
  cursor: pointer;
}
.check-bill .checkbox label {
  margin-left: 10px;
  cursor: pointer;
}
.check-bill .bill-field {
  display: none;
}
.sidebar-checkout .checkout-buttons {
  margin-bottom: 15px;
}
.sidebar-checkout .checkout-buttons label {
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 16px;
}
.sidebar-checkout .checkout-buttons textarea {
  width: 100%;
  resize: none;
}
.sidebar-checkout .order_action .btncart-checkout {
  display: block;
  padding: 10px 15px;
  border-radius: 3px;
  background: #000000;
  color: #fff;
  margin-bottom: 15px;
  border: none;
  outline: none;
  width: 100%;
}
</style>
