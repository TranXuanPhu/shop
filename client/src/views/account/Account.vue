<template>
  <div id="template-account" class="mg-top-50 pd-bottom-30">
    <div class="container">
      <div class="row d-flex">
        <div
          class="col-xs-12 col-sm-3 col-md-3 sidebar-account mg-bottom-15 item-left"
        >
          <div class="AccountSidebar">
            <div class="account-left-header">
              <div class="user-account">
                <div class="user-acc-logo" data-color="P">PT</div>
                <div class="user-account">
                  <h4 class="user-account-name">Phú Trần Xuân</h4>
                  <div class="user-account-email">xuanphu821@gmail.com</div>
                </div>
              </div>
            </div>
            <div class="AccountContent">
              <ul v-for="(info, index) in accountContent" :key="index">
                <LeftHeaderTemplate :info="info" />
              </ul>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-9 col-md-9 item-right mg-bottom-15">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LeftHeaderTemplate from "../../components/account/LeftHeader.vue";
import { accountContent } from "../../const/index.js";
export default {
  name: "account-template",
  components: { LeftHeaderTemplate },
  setup() {
    return { accountContent };
  },
};
</script>

<style scoped>
#template-account {
  padding-bottom: 30px;
}
#template-account .item-left .AccountSidebar {
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px;
  border-radius: 5px;
  position: relative;
}
#template-account .item-left .AccountSidebar:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 5.3rem;
  border-top: 1px solid #e3e3e3;
  z-index: 99;
  width: 100%;
}
.account-left-header .user-account {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.user-acc-logo[data-color="P"] {
  background-color: #00d394;
}
.account-left-header .user-account .user-acc-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
}
.account-left-header .user-account {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.account-left-header .user-account .user-account {
  width: calc(100% - 50px);
  padding-left: 10px;
}
.account-left-header .user-account .user-account .user-account-name {
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 5px;
}
.account-left-header .user-account .user-account .user-account-email {
  font-size: 12px;
  color: #545454;
  width: 100%;
}
#template-account .item-left .AccountSidebar .AccountContent {
  margin-top: 40px;
}
</style>
