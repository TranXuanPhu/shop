<template>
  <div id="template-account" class="mg-top-50">
    <div class="container">
      <div class="row d-flex d-flex-center js-center">
        <div class="col-sm-6 col-xs-12 contact-form-warp text-center">
          <div class="header-page clearfix">
            <h1>Tạo tài khoản</h1>
          </div>
          <div class="formkit-userbox">
            <FormKit
              type="form"
              :submit-attrs="{ inputClass: 'button' }"
              submit-label="Đăng ký"
              @submit="handleRegister"
            >
              <FormKit
                type="text"
                label="Họ và tên"
                name="fullName"
                validation="required"
                validation-visibility="dirty"
                :validation-messages="{
                  required: validate.checkRequired('Họ và tên'),
                }"
              />

              <FormKit
                type="text"
                label="Tài khoản"
                name="userName"
                validation="required|length:5,15"
                validation-visibility="dirty"
                :validation-messages="{
                  required: validate.checkRequired('Tài khoản'),
                  length: validate.checkLengthBetween(5, 15, 'Tài khoản'),
                }"
              />
              <FormKit
                type="email"
                label="Email"
                name="email"
                validation="required|*email"
                validation-visibility="dirty"
                placeholder="example@gmail.com"
                :validation-messages="{
                  required: validate.checkRequired('Email'),
                  email: validate.email,
                }"
              />
              <FormKit
                type="password"
                label="Mật khẩu"
                name="password"
                validation="required|length:8|matches:/[0-9]/"
                validation-visibility="dirty"
                placeholder="********"
                :validation-messages="{
                  required: validate.checkRequired('Mật khẩu'),
                  matches: validate.matches,
                  length: validate.checkMinLength(8),
                }"
              />
              <FormKit
                type="password"
                name="password_confirm"
                label="Nhập lại mật khẩu"
                validation="confirm"
                validation-label="password confirmation"
                placeholder="********"
                validation-visibility="dirty"
                :validation-messages="{
                  confirm: validate.passwordConfirm,
                }"
              />
            </FormKit>
            <div style="text-align: center; padding-top: 12px">
              <router-link :to="{ name: 'Register' }">
                <i class="fa fa-reply"></i>
                Trở về trang chủ
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validate } from "../../const/validate.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "register-page",
  setup() {
    const store = useStore();
    const router = useRouter();
    function handleRegister(event) {
      console.log("Register", event);
      const resPromise = store.dispatch("user/register", event);
      resPromise.then((data) => {
        router.push({ name: "Login" });
        console.log("data", data);
      });
    }
    return { validate, handleRegister };
  },
};
</script>
<style>
.js-center {
  justify-content: center;
}
.row {
  margin-right: -15px;
  margin-left: -15px;
}

.d-flex-center {
  align-items: center;
}
.mg-top-50 {
  margin-top: 50px;
}
.text-center {
  text-align: center !important;
}
</style>
