<template>
  <div v-if="address">
    <div class="row">
      <div class="col-lg-12 clearfix">
        <div class="address_title">
          <h3>
            <strong>{{ getFullName() }}</strong>
            <span class="default_address note">{{ addressDefault() }}</span>
          </h3>
          <p class="address_actions text-right">
            <span class="action_link action_edit">
              <a href="#" @click="handleEditAddress()">
                <i class="fa-solid fa-pencil fa-sm"></i> </a
            ></span>
            <span class="action_link action_delete">
              <a href="#" @click="handleDeleteAddress()">
                <i class="fa fa-times" aria-hidden="true"></i> </a
            ></span>
          </p>
        </div>
      </div>
    </div>
    <div class="address_table">
      <div class="customer_address" style="">
        <div class="view_address" v-show="!isShowFormEditAddress">
          <div class="col-md-12 col-sm-12 col-xs-12 row">
            <p>
              <strong>{{ getFullName() }}</strong>
            </p>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12 row">
            <p>
              <b>Công ty: {{ address.company }}</b>
            </p>
          </div>

          <div class="col-md-12 col-sm-12 col-xs-12 row">
            <p><b>Địa chỉ: </b>{{ getFullAddress() }}</p>
          </div>

          <div class="col-md-12 col-sm-12 col-xs-12 row">
            <p><b>Số điện thoại:</b> {{ address.phone }}</p>
          </div>
        </div>
      </div>
      <AddressFormTemplate
        :isShow="isShowFormEditAddress"
        :addressPrev="address"
        @handleAddress="(data) => updateAddress(data)"
      />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import AddressFormTemplate from "./AddressForm.vue";
export default {
  name: "address-detail-template",
  components: { AddressFormTemplate },
  props: {
    address: { type: Object },
  },
  setup(props, { emit }) {
    const isShowFormEditAddress = ref(false);
    function getFullName() {
      if (!props.address) return "";
      return props.address.firstName + " " + props.address.lastName;
    }
    function getFullAddress() {
      return (
        props.address.address +
        "," +
        props.address.province +
        "," +
        props.address.country
      );
    }
    function addressDefault() {
      return props.address.default ? "(Địa chỉ mặc định)" : "";
    }
    function updateAddress(data) {
      emit("handleAddress", data);
    }
    function handleEditAddress() {
      isShowFormEditAddress.value = !isShowFormEditAddress.value;
    }
    function handleDeleteAddress() {
      if (confirm("Bạn muốn xóa địa chỉ " + getFullName() + " ?")) {
        emit("handleDeleteAddress", props.address);
      }
    }
    return {
      isShowFormEditAddress,
      getFullName,
      getFullAddress,
      addressDefault,
      updateAddress,
      handleEditAddress,
      handleDeleteAddress,
    };
  },
};
</script>
<style scoped>
.address_title {
  margin-bottom: 0;
  font-size: 16px;
  padding: 10px 70px 10px 10px;
  background-color: #000000;
  border-color: #bce8f1;
  position: relative;
}
.address_title h3 {
  margin: 0;
  font-size: 14px;
  color: #fff;
}
.address_title * {
  color: #fff;
}
p.address_actions.text-right {
  margin: 7px 5px 0px 0;
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
}
span.action_link {
  padding: 8px;
}
.action_link a {
  text-transform: uppercase;
  font-size: 15px;
}
.address_table {
  margin-bottom: 10px;
  border-top: 0px solid #ddd;
  background: #fafafa;
  padding: 15px;
}
.view_address p {
  margin: 5px 0;
  font-size: 14px;
}
</style>
