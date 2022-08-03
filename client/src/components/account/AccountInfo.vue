<template>
  <div class="row">
    <div class="col-xs-12" id="customer_sidebar">
      <h1 class="title-detail h3">Thông tin tài khoản</h1>
      <div class="list-infomation mg-top-30">
        <table>
          <tbody>
            <tr>
              <td><strong>Họ tên: </strong></td>
              <td>{{ loggedUser.fullName }}</td>
            </tr>
            <tr>
              <td><strong>Email: </strong></td>
              <td>{{ loggedUser.email }}</td>
            </tr>
            <tr>
              <td><strong>Số điện thoại: </strong></td>
              <td>{{ address ? address.phone : "" }}</td>
            </tr>
            <tr>
              <td><strong>Địa chỉ: </strong></td>
              <td>
                {{ address ? address.address + " " + address.province : "" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "account-info-template",
  setup() {
    const store = useStore();
    const loggedUser = computed(() => store.getters["user/getLoggedUser"]);
    const address = computed(() => store.getters["user/getAddressDefault"]);

    return { loggedUser, address };
  },
};
</script>
<style scoped></style>
