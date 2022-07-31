<template>
  <div id="template-account" class="mg-top-50">
    <div class="container">
      <div class="row d-flex d-flex-center js-center">
        <div class="col-sm-6 col-xs-12 contact-form-warp text-center">
          <div class="header-page clearfix">
            <h1>Đăng nhập tài khoản</h1>
          </div>
          <div class="formkit-userbox">
            <FormKit
              type="form"
              :submit-attrs="{ inputClass: 'button' }"
              submit-label="Đăng Nhập"
              @submit="handleLogin"
            >
              <FormKit
                type="text"
                label="Tài khoản"
                name="userName"
                validation="required"
                validation-visibility="dirty"
                placeholder="nhập tài khoản hoặc email"
                :validation-messages="{
                  required: validate.checkRequired('Tài khoản'),
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
            </FormKit>
            <div style="padding-top: 10px">
              Bạn chưa có tài khoản?
              <router-link
                :to="{ name: 'Register' }"
                style="text-decoration: underline"
                >Đăng ký</router-link
              >
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
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "login-page",
  setup() {
    //data
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref(true);

    //method
    function handleLogin(formData, node) {
      isLoading.value = true;
      node.clearErrors();

      console.log("handleLogin", formData);

      store
        .dispatch("user/login", formData)
        .then((user) => {
          console.log("user", user);

          router.push({
            path: route.query.redirect || "/",
          });
        })
        .catch((error) => {
          node.setErrors(
            [error.response.data?.message || ""],
            // Arg 2 is field-specific errors
            {
              password: error.response.data?.password || "",
              userName: error.response.data?.userName || "",
            }
          );
        });

      // resPromise.then((data) => {
      //   console.log("data", data);
      // });
    }
    return { validate, handleLogin, isLoading };
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

.userbox {
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
  padding: 2em;
  display: block;
  border-radius: 0.5em;
  width: 100%;
  box-sizing: border-box;
  max-width: 30.375em;
  margin: 2em auto;
  text-align: left;
}
</style>
