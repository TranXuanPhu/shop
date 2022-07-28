<template>
  <div ref="refAddress" class="customer_address edit_address" v-show="isShow">
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
        <span class="input-group-addon"><i class="fa fa-map-marker"></i></span>
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
        <span class="input-group-addon"><i class="fa fa-map-marker"></i></span>
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
          :value="addressPrev ? 'Cập nhật' : 'Thêm mới'"
          type="submit"
          @click="handleAddress()"
        />
        <span class="" style="margin-left: 10px">hoặc <a href="#">Hủy</a></span>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "address-form-template",
  props: {
    addressPrev: { type: Object },
    isShow: { type: Boolean },
  },
  setup(props, { emit }) {
    const refAddress = ref();
    const firstName = ref(props.addressPrev?.firstName);
    const lastName = ref(props.addressPrev?.lastName);
    const company = ref(props.addressPrev?.company);
    const address = ref(props.addressPrev?.address);
    const province = ref(props.addressPrev?.province);
    const country = ref(props.addressPrev?.country);
    const phone = ref(props.addressPrev?.phone);
    const isDefault = ref(props.addressPrev?.default);

    function handleAddress() {
      const data = {
        _id: props.addressPrev?._id,
        firstName: firstName.value,
        lastName: lastName.value,
        company: company.value,
        address: address.value,
        province: province.value,
        country: country.value,
        phone: phone.value,
        default: isDefault.value,
      };
      // console.log("add_address:", data);
      emit("handleAddress", data);
    }

    return {
      refAddress,
      handleAddress,
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
<style scoped></style>
