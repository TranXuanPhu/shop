<template>
  <div
    class="d-flex-column col-lg-2 col-md-3 col-sm-4 col-xs-6 pd-15 pd-right-0"
    v-if="product"
  >
    <div class="product-block item">
      <div class="product-img has-hover">
        <router-link
          :to="{ name: 'ProductDetails', params: { slug: product.slug } }"
        >
          <img
            :src="`data:${product.images[0].img.contentType};base64,${product.images[0].img.data}`"
            width="260"
            height="260"
            alt=""
          />
        </router-link>
        <div class="product-wishlist">
          <button class="wishlist-loop" data-toggle="tooltip">
            <i class="fa-solid fa-heart fa-xl"></i>
            <!-- <i class="fa-solid fa-cart-plus fa-xl"></i> -->
          </button>
        </div>
        <div class="product-icon-action">
          <div class="add-to-cart" @click="addToCart">
            <button
              class="inline-block icon-addcart margin_right_10 box-shadow"
            >
              Thêm vào giỏ
            </button>
          </div>
          <div class="quick-view"></div>
        </div>
      </div>
      <div class="product-detail">
        <h3 class="pro-name">
          <router-link
            :to="{ name: 'ProductDetails', params: { slug: product.slug } }"
            >{{ product.name }}</router-link
          >
        </h3>
        <div class="box-pro-prices">
          <p class="pro-price">
            <span>{{ toMoneyString(product.price) }}</span>
          </p>
        </div>
        <ul class="list-variants-img d-flex d-flex-wrap" ref="swatchColor">
          <li
            v-for="(color, index) in product.colors"
            :key="index"
            @click="selectSwatch(color)"
            :data-vhandle="toDataHandlerSwatch(color.name)"
          >
            <img
              :src="`data:${color.image.img.contentType};base64,${color.image.img.data}`"
              width="260"
              height="260"
              alt=""
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { toMoneyString } from "../../helpers/utils.js";
import { removeVietnameseTones } from "../../helpers/utils.js";
import { useStore } from "vuex";
export default {
  name: "product-template",
  props: {
    product: {
      type: Object,
    },
  },
  setup(props) {
    const store = useStore();
    const colorSelected = ref(null);
    const sizeSelected = ref(null);
    const swatchColor = ref(null);
    function isSoldOutBySwatch(color) {
      let quantity = 0;
      color.sizes.forEach((size) => {
        quantity += size.quantity;
      });
      return quantity <= 0;
    }
    function isSoldOutBySize(size) {
      return size.quantity <= 0;
    }
    function addToCart() {
      if (!sizeSelected.value || !colorSelected.value) {
        store.dispatch("setModalError", true);
        return;
      }
      const data = {
        productId: props.product._id,
        colorId: colorSelected.value._id,
        sizeName: sizeSelected.value.name,
        quantity: 1,
      };
      store
        .dispatch("cart/addToCart", data)
        .then((cart) => {
          store.dispatch("setAddCartSuccess", true);
          console.log("addToCart success:", cart);
        })
        .catch((error) => console.log("addToCart:", error));
      // console.log("addToCart:", props.product);
      // console.log("colorSelected:", colorSelected.value);
      // console.log("sizeSelected:", sizeSelected.value);
    }

    function toDataHandlerSwatch(colorName) {
      return (
        "swatch-" +
        removeVietnameseTones(colorName).toLowerCase().split(" ").join("-")
      );
    }
    function selectSwatch(color) {
      //check soldout
      if (isSoldOutBySwatch(color)) return;
      //remove class active
      const labelElements =
        swatchColor.value.querySelectorAll("li[data-vhandle]");
      // console.log("selectSwatch", labelElements);
      labelElements.forEach((element) => {
        element.classList.remove("active");
      });

      //add class active
      const eLi = swatchColor.value.querySelector(
        `li[data-vhandle='${toDataHandlerSwatch(color.name)}']`
      );
      eLi.classList.add("active");

      colorSelected.value = color;

      //select sizes
      for (const size of colorSelected.value.sizes) {
        if (isSoldOutBySize(size)) continue;
        sizeSelected.value = size;
        break;
      }
    }
    onMounted(() => {
      for (const color of props.product?.colors) {
        if (!isSoldOutBySwatch(color)) {
          selectSwatch(color);
          break;
        }
      }
    });

    return {
      toMoneyString,
      colorSelected,
      sizeSelected,
      swatchColor,
      addToCart,
      isSoldOutBySwatch,
      selectSwatch,
      toDataHandlerSwatch,
    };
  },
};
</script>

<style scoped>
.product-block {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding-bottom: 15px;
  min-height: 100%;
  flex: 1;
}
.product-block .product-img {
  text-align: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 0;
  margin: 0;
}
.product-block .product-img > a {
  display: block;
  position: relative;
  z-index: 9;
}
.product-block .product-img > a:before {
  content: "";
  padding-bottom: 100%;
  display: block;
}
.product-block .product-img > a img {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
  z-index: 8;
}
.product-block .product-img .product-wishlist {
  position: absolute;
  z-index: 9;
  top: 0px;
  right: 0px;
}
.product-block .product-img .product-wishlist button {
  outline: none;
  border: none;
  background: none;
  width: 35px;
  height: 35px;
}

.product-block .product-img .product-icon-action {
  position: absolute;
  top: auto;
  bottom: -50px;
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 5px);
  justify-content: space-between;
  right: auto;
  left: 0;
  z-index: 10;
  margin-left: -5px;
}
.product-block:hover .product-icon-action {
  bottom: 0;
}
.product-block .product-img .product-icon-action > div > button {
  color: #fff;
  display: inline-block;
  line-height: 35px;
  padding: 0;
  font-weight: 400;
  margin: 0;
  background-color: var(--bgshop);
  text-align: center;
  position: relative;
  border: none;
  width: 100%;
}
.product-block .product-img .product-icon-action > div > button:after,
.product-block .product-img .product-icon-action > div > button:before {
  position: absolute;
  z-index: 9;
  content: "";
  opacity: 0;
}
.product-block .product-img .product-icon-action > div > button:before {
  top: 3px;
  right: 3px;
  bottom: 3px;
  left: 3px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  transform: scale(0, 1);
  transform-origin: center;
}
.product-block .product-img .product-icon-action > div > button:after {
  top: 3px;
  right: 3px;
  bottom: 3px;
  left: 3px;
  border-right: 1px solid #fff;
  border-left: 1px solid #fff;
  transform: scale(1, 0);
  transform-origin: center;
}
.product-block .product-img .product-icon-action > div > button:hover:before,
.product-block .product-img .product-icon-action > div > button:hover:after {
  opacity: 1;
  transform: scale(1);
}
.product-block .product-img .product-icon-action > div {
  width: 50%;
  padding-left: 5px;
}
.product-block .product-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.product-block .product-detail .pro-name {
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  flex: auto;
}
.product-block .product-detail .pro-name a {
  font-size: 16px;
  font-weight: 550;
  color: #000000;
  line-height: 18px;
  padding-top: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product-block .product-detail .pro-price {
  margin: 0;
}
.product-block .product-detail .pro-price span {
  color: #e70303;
  font-weight: 600;
}
.list-variants-img {
  margin-top: 10px;
  flex: 1;
  height: 100%;
  margin-bottom: 0 !important;
  padding-left: 0 !important;
}
.list-variants-img li.active {
  border-color: #000;
}
.list-variants-img li {
  margin-right: 5px;
  line-height: 20px;
  text-align: center;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 50%;
  list-style: none !important;
}
.list-variants-img li img {
  width: 16px;
  height: 16px;
  display: block;
  border-radius: 50%;
  cursor: pointer;
  background-size: contain;
  background-position: center;
}
</style>
