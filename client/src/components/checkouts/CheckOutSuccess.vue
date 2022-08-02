<template>
  <div class="main">
    <div class="main-content">
      <div>
        <div class="section">
          <div class="section-header os-header">
            <svg
              width="50"
              height="50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#000"
              stroke-width="2"
              class="hanging-icon checkmark"
            >
              <path
                class="checkmark_circle"
                d="M25 49c13.255 0 24-10.745 24-24S38.255 1 25 1 1 11.745 1 25s10.745 24 24 24z"
              ></path>
              <path
                class="checkmark_check"
                d="M15 24.51l7.307 7.308L35.125 19"
              ></path>
            </svg>

            <div class="os-header-heading">
              <h2 class="os-header-title">Đặt hàng thành công</h2>
              <span class="os-order-number">
                Mã đơn hàng #{{ indexCode }}
              </span>

              <span class="os-description"> Cám ơn bạn đã mua hàng! </span>
            </div>
          </div>
        </div>

        <div class="section thank-you-checkout-info">
          <div class="section-content">
            <div class="content-box">
              <div
                class="content-box-row content-box-row-padding content-box-row-no-border"
              >
                <h2>Thông tin đơn hàng</h2>
              </div>
              <div class="content-box-row content-box-row-padding">
                <div class="section-content">
                  <div class="section-content-column">
                    <h3>Thông tin giao hàng</h3>

                    {{ info.fullName }}
                    <br />

                    {{ info.phone }}
                    <br />

                    <p>
                      <span v-for="(br, index) in address" :key="index">
                        {{ br }}
                        <br />
                      </span>
                    </p>

                    <h3>Phương thức thanh toán</h3>
                    <p>Thanh toán khi giao hàng (COD)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="step-footer">
          <router-link
            :to="{ name: 'Home' }"
            class="step-footer-continue-btn btn"
          >
            <span class="btn-content">Tiếp tục mua hàng</span>
          </router-link>

          <p class="step-footer-info">
            <i class="icon icon-os-question"></i>
            <span>
              Cần hỗ trợ?
              <a href="mailto:heyyoustudiovn@gmail.com">Liên hệ chúng tôi</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";

export default {
  name: "checkout-success-template",
  props: { info: Object, indexCode: Number },
  setup(props) {
    const address = computed(() => props.info?.address.split(",") || []);

    return { address };
  },
};
</script>
<style scoped>
.main {
  width: 52%;
  width: 52%;
  padding-right: 6%;
}
.section:first-child {
  padding-top: 0;
}
.section .section-header {
  position: relative;
}
.hanging-icon {
  margin-right: 0.75em;
  stroke: #338dbc;
}
.hanging-icon {
  position: absolute;
  right: 100%;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  margin-right: 1.5em;
}
.os-header .os-header-heading {
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}
.os-header .os-header-heading .os-header-title {
  font-size: 1.5em;
  margin-bottom: 0.1em;
}
.os-header .os-header-heading .os-order-number {
  display: block;
}
.os-header .os-header-heading .os-description {
  color: #4d4d4d;
}
.section.thank-you-checkout-info {
  padding-top: 1.5em;
}
.section .section-content.no-mb,
.section .section-content:last-child {
  margin-bottom: inherit;
}
.section .section-content .content-box {
  box-shadow: 0 0 0 1px #d9d9d9;
  border-radius: 4px;
  background: #fff;
  color: #737373;
  margin-top: 1em;
}
.section .section-content .content-box:first-child {
  margin-top: 0;
}
.section .section-content .content-box .content-box-row {
  display: table;
  box-sizing: border-box;
  width: 100%;
  border-top: 1px solid #d9d9d9;
  zoom: 1;
}
.section
  .section-content
  .content-box
  .content-box-row.content-box-row-padding {
  padding: 0.8em 0.6em;
}
.section .section-content .content-box .content-box-row:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-top: none;
}
.section .section-content .content-box h2 {
  color: #333333;
}
.section .section-content .content-box h2:only-child {
  margin: 0;
}
.section .section-content .content-box .content-box-row {
  display: table;
  box-sizing: border-box;
  width: 100%;
  border-top: 1px solid #d9d9d9;
  zoom: 1;
}
.section
  .section-content
  .content-box
  .content-box-row.content-box-row-padding {
  padding: 0.8em 0.6em;
}

element.style {
}
.section
  .section-content
  .content-box
  .content-box-row.content-box-row-no-border
  + .content-box-row {
  border-top: none !important;
}
.section .section-content .content-box .content-box-row:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.section .section-content {
  zoom: 1;
}
.section .section-content .content-box h3 {
  color: #4d4d4d;
}
.step-footer {
  z-index: 2;
  position: relative;
  margin-top: 1em;
  zoom: 1;
}
.step-footer {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row-reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  margin-top: 1.5em;
}
.btn {
  display: inline-block;
  border-radius: 4px;
  font-weight: 500;
  padding: 1.4em 1.7em;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  position: relative;
  background: #338dbc;
  color: white;
}
.step-footer .step-footer-continue-btn {
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  float: right;
}
.step-footer .step-footer-info {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.step-footer .step-footer-info {
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  margin-right: 1em;
  float: left;
}
</style>
