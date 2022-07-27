<template>
  <div class="col-md-6 col-sm-12 col-xs-12 col-lg-6 pt20">
    <div href="#" class="add-new-address" @click="toggleShow()">
      Nhập địa chỉ mới
    </div>
    <div id="add_address" class="customer_address edit_address">
      <div id="address_form_new">
        <input name="form_type" type="hidden" value="customer_address" />
        <input name="utf8" type="hidden" value="✓" />

        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-user"></i></span>
          <input
            type="text"
            id="address_first_name_new"
            class="form-control textbox"
            name="firstName"
            size="40"
            placeholder="Họ"
            v-model="firstName"
          />
        </div>
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-user"></i></span>
          <input
            type="text"
            id="address_last_name_new"
            class="form-control textbox"
            name="lastName"
            size="40"
            placeholder="Tên"
            v-model="lastName"
          />
        </div>
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-home"></i></span>
          <input
            type="text"
            for="address_company_new"
            class="form-control textbox"
            name="company"
            v-model="company"
            placeholder="Công ty"
          />
        </div>
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-home"></i></span>
          <input
            type="text"
            id="address_address1_new"
            class="form-control textbox"
            name="address"
            v-model="address"
            placeholder="Địa chỉ "
          />
        </div>

        <div class="input-group">
          <span class="input-group-addon"
            ><i class="fa fa-map-marker"></i
          ></span>
          <input
            type="text"
            id="address_address1_new"
            class="form-control textbox"
            name="province"
            v-model="province"
            placeholder="Tỉnh"
          />
        </div>
        <div class="input-group">
          <span class="input-group-addon"
            ><i class="fa fa-map-marker"></i
          ></span>
          <input
            type="text"
            id="address_address1_new"
            class="form-control textbox"
            name="country"
            v-model="country"
            placeholder="Nước"
          />
        </div>
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-phone"></i></span>
          <input
            type="text"
            id="address_phone_new"
            class="form-control textbox"
            name="phone"
            v-model="phone"
            placeholder="Số điện thoại"
          />
        </div>
        <div class="mg-bottom-10">
          <input
            type="checkbox"
            id="address_default_address_new"
            name="default"
            v-model="isDefault"
          />
          Đặt làm địa chỉ mặc định.
        </div>
        <div class="action_bottom">
          <input
            class="btn btn-primary"
            value="Thêm mới"
            type="submit"
            @click="addAddress()"
          />
          <span class="" style="margin-left: 10px"
            >hoặc <a href="#">Hủy</a></span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "address-new-template",
  setup() {
    const store = useStore();
    const firstName = ref("");
    const lastName = ref("");
    const company = ref("");
    const address = ref("");
    const province = ref("");
    const country = ref("");
    const phone = ref("");
    const isDefault = ref(false);
    const isShow = ref(false);
    function toggleShow() {
      isShow.value = !isShow.value;
      const display = isShow.value ? "display: none;" : "";
      document.getElementById("add_address").style = display;
    }
    function addAddress() {
      const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        company: company.value,
        address: address.value,
        province: province.value,
        country: country.value,
        phone: phone.value,
        default: isDefault.value,
      };
      console.log("add_address:", data);

      store
        .dispatch("user/createAddresses", data)
        .then((response) => {
          console.log("add_address:", response);
        })
        .catch((error) => {
          console.error("add_address", error);
        });
    }

    return {
      isShow,
      toggleShow,
      addAddress,
      firstName,
      lastName,
      company,
      address,
      province,
      country,
      phone,
      isDefault,
    };
  },
};
</script>
<style scoped>
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
