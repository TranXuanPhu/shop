<template>
  <div class="jquery-modal blocker-success current" ref="modalSuccess">
    <div class="modal-show" id="success-cart-wanda" style="opacity: 1">
      <div class="row">
        <div class="modal-content">
          <div class="modal-icon sweet-alert">
            <div class="sa-icon sa-success animate">
              <span class="sa-line sa-tip animateSuccessTip"></span>
              <span class="sa-line sa-long animateSuccessLong"></span>
              <div class="sa-placeholder"></div>
              <div class="sa-fix"></div>
            </div>
          </div>
          <div class="modal-body text-center">
            <p class="modal-title">Thêm vào giỏ thành công</p>
            <div class="media-success">
              <div class="media-left">
                <span class="quantity">1</span>
                <div class="thumb-cart">
                  <img
                    width="70px"
                    src="//product.hstatic.net/200000031420/product/spot_tee_poster_950fa723cc9e4c5fa891c76ddd66e986_small.jpg"
                    alt="HEYYOU SPOT TEE"
                  />
                </div>
              </div>
              <div class="media-body">
                <div class="product-title">HEYYOU SPOT TEE</div>
                <div class="product-new-price"><span>99,000₫</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  name: "success-template",
  setup() {
    const modalSuccess = ref();

    return { modalSuccess };
  },
};
</script>
<style scoped>
.blocker-success {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  z-index: 999999999;
  padding: 10px;
  box-sizing: border-box;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.75);
  text-align: center;
  /* display: none; */
}
.blocker-success:before {
  content: "";
  display: inline-block;
  height: 40%;
  vertical-align: middle;
  margin-right: -0.05em;
}
#success-cart-wanda,
#success-subcribe-wanda {
  max-width: 400px;
  margin: 0 auto;
  display: block;
}

.modal-succes .modal-body .modal-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.modal-succes .modal-body p:not(.modal-title) {
  font-size: 15px;
  margin: 10px 0 5px;
}

.modal-succes .modal-body .txtloading {
  color: #aaa;
  font-size: 13.5px;
}

.modal-icon.sweet-alert {
  padding-top: 0;
  margin-top: -15px;
}

.animateSuccessTip {
  animation: animateSuccessTip 0.75s;
}

.animateSuccessLong {
  animation: animateSuccessLong 0.75s;
}

.sa-icon.sa-success.animate::after {
  animation: rotatePlaceholder 4.25s ease-in;
}

.sweet-alert .sa-icon.sa-success {
  width: 80px;
  height: 80px;
  border: 4px solid #4cae4c;
  border-radius: 50%;
  margin: 0 auto 0;
  position: relative;
  box-sizing: content-box;
  transform: scale(0.7);
}

.sweet-alert .sa-icon.sa-success::before,
.sweet-alert .sa-icon.sa-success::after {
  content: "";
  border-radius: 50%;
  position: absolute;
  width: 60px;
  height: 120px;
  background: #fff;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.sweet-alert .sa-icon.sa-success::before {
  border-radius: 120px 0 0 120px;
  top: -7px;
  left: -33px;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 60px 60px;
  -moz-transform-origin: 60px 60px;
  -o-transform-origin: 60px 60px;
  transform-origin: 60px 60px;
}

.sweet-alert .sa-icon.sa-success::after {
  border-radius: 0 120px 120px 0;
  top: -11px;
  left: 30px;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 0px 60px;
  -moz-transform-origin: 0px 60px;
  -o-transform-origin: 0px 60px;
  transform-origin: 0px 60px;
}

.sweet-alert .sa-icon.sa-success .sa-placeholder {
  width: 80px;
  height: 80px;
  border: 4px solid rgba(92, 184, 92, 0.2);
  border-radius: 50%;
  box-sizing: content-box;
  position: absolute;
  left: -4px;
  top: -4px;
  z-index: 2;
}

.sweet-alert .sa-icon.sa-success .sa-fix {
  width: 5px;
  height: 90px;
  background-color: #fff;
  position: absolute;
  left: 28px;
  top: 8px;
  z-index: 1;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.sweet-alert .sa-icon.sa-success .sa-line {
  height: 5px;
  background-color: #5cb85c;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 2;
}

.sweet-alert .sa-icon.sa-success .sa-line.sa-tip {
  width: 25px;
  left: 14px;
  top: 46px;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.sweet-alert .sa-icon.sa-success .sa-line.sa-long {
  width: 47px;
  right: 8px;
  top: 38px;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.modal-body {
  position: relative;
}

.media-success {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.media-success .media-left {
  margin-right: 10px;
  position: relative;
}
.media-success .media-left img {
  max-width: 50px;
}
.media-success .media-left .quantity {
  position: absolute;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  background: var(--bgshop);
  color: #fff;
  font-size: 12px;
  top: -8px;
  left: -7px;
}
.media-success .media-body .product-title {
  margin-bottom: 10px;
  text-align: left;
}
.media-success .media-body .product-new-price span {
  color: #ff0000;
}

#success-cart-wanda .modal-title {
  font-size: 15px;
}
</style>
