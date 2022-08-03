<template>
  <div class="main">
    <!-- <div class="main-header">
      <ul class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'Cart' }"> Giỏ hàng </router-link>
        </li>

        <li class="breadcrumb-item breadcrumb-item-current">
          Thông tin giao hàng
        </li>
      </ul>
    </div> -->
    <div class="main-content">
      <div class="step">
        <div class="step-sections steps-onepage" step="1">
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">Thông tin giao hàng</h2>
            </div>
            <div
              class="section-content section-customer-information no-mb"
              v-if="!isLoggedIn"
            >
              <p class="section-content-text">
                Bạn đã có tài khoản?
                <router-link
                  :to="{ name: 'Login', query: { redirect: redirect() } }"
                >
                  Đăng nhập
                </router-link>
              </p>
            </div>
            <FormKit
              type="form"
              :submit-attrs="{ inputClass: 'button' }"
              submit-label="Hoàng tất đơn hàng"
              @submit="handleOrders"
            >
              <FormKit
                type="text"
                label="Họ và tên"
                name="fullName"
                :value="
                  address ? address?.firstName + ' ' + address?.lastName : ''
                "
                validation="required"
                validation-visibility="dirty"
                placeholder="nhập họ và tên"
                :validation-messages="{
                  required: validate.checkRequired('Họ và tên'),
                }"
              />
              <FormKit
                type="email"
                label="Email"
                name="email"
                validation="*email"
                validation-visibility="dirty"
                placeholder="example@gmail.com"
                :validation-messages="{
                  email: validate.email,
                }"
              />
              <FormKit
                type="tel"
                label="Số điện thoại"
                name="phone"
                :value="address?.phone"
                validation="required|matches:/^[0-9]{10}$/"
                validation-visibility="dirty"
                placeholder="xxx-xxx-xxxx"
                :validation-messages="{
                  required: validate.checkRequired('Số điện thoại'),
                  matches: 'Phone number must be in the format xxx-xxx-xxxx',
                }"
              />
              <FormKit
                type="text"
                label="Địa chỉ"
                name="address"
                validation="required"
                validation-visibility="dirty"
                placeholder="nhập địa chỉ"
                :value="address?.address + ', ' + address?.province"
                :validation-messages="{
                  required: validate.checkRequired('Địa chỉ'),
                }"
              />
              <FormKit
                type="textarea"
                label="Ghi chú cho shop"
                name="note"
                validation-visibility="dirty"
                placeholder="Ghi chú"
              />
              <FormKit
                type="radio"
                label="vận chuyển"
                :options="['Giao hàng tận nơi 40,000₫']"
                name="shippingMoney"
              />
              <FormKit
                type="radio"
                label="thanh toán"
                :options="['Thanh toán khi giao hàng(COD)']"
                name="shipCod"
              />
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validate } from "../../const/validate.js";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "check-outs-left-template",
  props: {
    address: { type: Object },
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();

    const isLoggedIn = computed(() => store.getters["user/getStatusLoggedIn"]);

    function redirect() {
      return route.fullPath;
    }

    function handleOrders(event) {
      // console.log("handleOrders:", event);
      emit("handleOrder", event);
    }

    return { isLoggedIn, redirect, validate, handleOrders };
  },
};
</script>
<style scoped>
.main,
.sidebar {
  padding-top: 4em;
}
.main {
  width: 52%;
  padding-right: 6%;
}
.main .main-header {
  padding-bottom: 1em;
}
.main .main-header .logo {
  display: block;
}
</style>
