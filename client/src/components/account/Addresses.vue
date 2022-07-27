<template>
  <div class="row d-flex">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <AddressesDetailTemplate />
    </div>
    <AddressFormTemplate @handleAddress="(data) => createAddress(data)" />
  </div>
</template>
<script>
import AddressFormTemplate from "./AddressForm.vue";
import AddressesDetailTemplate from "./AddressesDetail.vue";
import { useStore } from "vuex";
export default {
  name: "address-template",
  components: { AddressFormTemplate, AddressesDetailTemplate },
  setup() {
    const store = useStore();
    function createAddress(data) {
      console.log("createAddress", data);
      store
        .dispatch("user/createAddresses", data)
        .then((response) => {
          console.log("add_address:", response);
        })
        .catch((error) => {
          console.error("add_address", error);
        });
    }

    return { createAddress };
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
</style>
