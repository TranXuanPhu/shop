<template>
  <div class="row d-flex">
    <div class="col-md-6 col-sm-12 col-xs-12" v-if="addresses">
      <AddressesDetailTemplate
        v-for="(address, index) in addresses"
        :key="index"
        :address="address"
        @handleAddress="(data) => updateAddress(data)"
        @handleDeleteAddress="
          (addressDelete) => handleDeleteAddress(addressDelete)
        "
      />
    </div>
    <div class="col-md-6 col-sm-12 col-xs-12 col-lg-6 pt20">
      <div href="#" class="add-new-address" @click="toggleShowNewFormAddress()">
        Nhập địa chỉ mới
      </div>
      <AddressFormTemplate
        :isShow="isShowNewFormAddress"
        @handleAddress="(data) => createAddress(data)"
      />
    </div>
  </div>
</template>
<script>
import AddressFormTemplate from "./AddressForm.vue";
import AddressesDetailTemplate from "./AddressesDetail.vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "address-template",
  components: { AddressFormTemplate, AddressesDetailTemplate },
  setup() {
    const store = useStore();
    const router = useRouter();
    const addresses = store.getters["user/getAddresses"];
    const isShowNewFormAddress = ref(false);
    function toggleShowNewFormAddress() {
      isShowNewFormAddress.value = !isShowNewFormAddress.value;
      //const display = isShow.value ? "" : "display: none;";
      //refAddress.value.style = display;
    }
    function createAddress(data) {
      console.log("createAddress", data);
      store
        .dispatch("user/createAddresses", data)
        .then((response) => {
          console.log("add_address:", response);
          router.go();
        })
        .catch((error) => {
          console.error("add_address", error);
        });
    }
    function updateAddress(data) {
      console.log("updateAddress", data);
      store
        .dispatch("user/updateAddress", data)
        .then((response) => {
          console.log("update_address:", response);
          router.go();
        })
        .catch((error) => {
          console.error("update_address", error);
        });
    }
    function handleDeleteAddress(addressDelete) {
      console.log("handleDeleteAddress", addressDelete._id);
      store
        .dispatch("user/deleteAddress", { _id: addressDelete._id })
        .then((response) => {
          console.log("delete_Address:", response);
          router.go();
        })
        .catch((error) => {
          console.error("delete_Address", error);
        });
    }

    return {
      isShowNewFormAddress,
      addresses,
      createAddress,
      updateAddress,
      toggleShowNewFormAddress,
      handleDeleteAddress,
    };
  },
};
</script>
<style scoped>
#template-account .input-group {
  display: flex;
}
#template-account .input-group input {
  width: 100%;
}
#template-account .input-group select {
  display: inline-block;
  min-width: 60px;
  max-width: 100%;
  height: auto;
  box-shadow: 0 0 0 0 transparent inset;
  padding: 0.6em 0.8em;
  color: #444444;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #fff
    url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNjE2MTYxIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMzAgMjQiIHdpZHRoPSIzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNy40MSA3Ljg0TDEyIDEyLjQybDQuNTktNC41OEwxOCA5LjI1bC02IDYtNi02eiIvPjxwYXRoIGQ9Ik0wLS43NWgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==)
    no-repeat right center;
  outline: none;
  border: 1px solid #d7d7d7;
  text-indent: 5px;
  font-size: 13px;
  width: 100%;
}
.add-new-address {
  padding-bottom: 10px;
  display: inline-block;
  padding: 10px;
  background: #000000;
  color: #fff !important;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
