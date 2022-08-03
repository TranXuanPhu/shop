<template>
  <div class="variants clearfix">
    <div class="select-swatch clearfix">
      <div id="variant-swatch-0" class="swatch clearfix" ref="swatchColor">
        <div class="header">
          Màu sắc:
          <span class="color-text">{{ colorSelected.name }}</span>
        </div>
        <div class="select-swap">
          <div
            class="n-sd swatch-element color"
            v-for="(color, index) in colors"
            :key="index"
            @click="selectSwatch(color)"
            :class="isSoldOutBySwatch(color) ? 'soldout' : ''"
          >
            <input
              class="variant-0 color-change"
              id="swatch-0-black"
              type="radio"
              name="option1"
              :value="color.name"
              :data-vhandle="toDataHandlerSwatch(color.name)"
              checked=""
            />
            <label :data-vhandle="toDataHandlerSwatch(color.name)">
              <img
                :src="`data:${color.image.img.contentType};base64,${color.image.img.data}`"
                :alt="`${color.image.name}`"
              />
            </label>
          </div>
        </div>
      </div>
      <div id="variant-swatch-1" class="swatch clearfix" ref="swatchSize">
        <div class="header">
          Kích thước: <span class="color-text">M</span>
          <div class="size-chart">
            <i class="fa-solid fa-ruler fa-lg"></i>
            Hướng dẫn chọn size
          </div>
        </div>
        <div class="select-swap">
          <div
            class="n-sd swatch-element l"
            v-for="(size, index) in colorSelected?.sizes"
            :key="index"
            @click="selectSize(size)"
            :data-value="size.name"
            :class="isSoldOutBySize(size) ? 'soldout' : ''"
          >
            <input
              type="radio"
              :value="size.name"
              :data-vhandle="toDataHandlerSwatch(size.name)"
              v-model="sizeSelected"
            />
            <label :data-vhandle="toDataHandlerSwatch(size.name)">
              <span>{{ size.name }}</span>
              <img
                class="img-check"
                width="14"
                height="14"
                src="//theme.hstatic.net/200000031420/1000879437/14/select-pro.png?v=28"
              />
            </label>
          </div>
        </div>
        <div :class="sizeSelected ? 'error-hide' : 'error-messages'">
          Hãy chọn kích thước sản phẩm
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 selector-actions d-flex d-flex-center pd-top-10">
        <div class="quantity-area">
          <input
            type="button"
            value="–"
            @click="minusQuantity()"
            class="qty-btn qtyminus"
          />
          <input
            type="text"
            id="quantity"
            name="quantity"
            :value="quantitySelect"
            min="1"
            class="quantity-selector"
          />
          <input
            type="button"
            value="+"
            @click="plusQuantity()"
            class="qty-btn qtyplus"
          />
        </div>
        <div class="wrap-addcart">
          <div class="row-flex">
            <button
              type="button"
              id="add-to-cart"
              class="flex-addcart-mb add-to-cart-style"
              name="add"
              @click="addToCart"
            >
              <span>Thêm vào giỏ</span>
            </button>
            <button
              type="button"
              id="buy-now"
              class="hidden-xs buynow-style"
              name="add"
              @click="BuyProduct"
            >
              <span>Mua ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { removeVietnameseTones } from "../../helpers/utils.js";
export default {
  name: "select-swatch-template",
  props: {
    colors: {
      type: Array,
    },
    productId: {
      type: String,
    },
  },
  setup(props) {
    //data
    const store = useStore();
    const router = useRouter();
    const sizeSelected = ref({});
    const colorSelected = ref({});
    const quantitySelect = ref(1);

    // ref  id="variant-swatch-0"
    const swatchColor = ref(null);
    // ref id="variant-swatch-1"
    const swatchSize = ref(null);

    //add to cart
    function addToCart() {
      if (!sizeSelected.value) return;
      const data = {
        productId: props.productId,
        colorId: colorSelected.value._id,
        sizeName: sizeSelected.value.name,
        quantity: quantitySelect.value,
      };
      console.log("data:", data);
      store
        .dispatch("cart/addToCart", data)
        .then((cart) => {
          store.dispatch("setAddCartSuccess", true);
          console.log("addToCart success:", cart);
        })
        .catch((error) => console.log("addToCart:", error));
    }
    //BuyProduct
    function BuyProduct() {
      if (!sizeSelected.value) return;
      const data = {
        productId: props.productId,
        colorId: colorSelected.value._id,
        sizeName: sizeSelected.value.name,
        quantity: quantitySelect.value,
      };
      console.log("data:", data);
      store
        .dispatch("cart/addToCart", data)
        .then(() => {
          router.push({ name: "CheckOuts" });
        })
        .catch((error) => console.log("addToCart:", error));
    }

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
    //methods
    function selectSize(size) {
      //check soldout
      if (isSoldOutBySize(size)) return;
      //remove class sd
      const labelElements = swatchSize.value.querySelectorAll(
        "label[data-vhandle]"
      );
      //console.log(labelElements);
      //có mới làm
      if (labelElements.length < 1) return;
      labelElements.forEach((element) => {
        element.classList.remove("sd");
      });

      //add class sd
      const elLabel = swatchSize.value.querySelector(
        `label[data-vhandle='${toDataHandlerSwatch(size.name)}']`
      );
      elLabel.classList.add("sd");

      sizeSelected.value = size;
      return;
    }

    function selectSwatch(color) {
      //check soldout
      if (isSoldOutBySwatch(color)) return;
      colorSelected.value = color;
      //chọn size
      sizeSelected.value = undefined;
      for (const size of color.sizes) {
        if (!isSoldOutBySize(size)) {
          selectSize(size);
          break;
        }
      }
      //remove class sd
      const labelElements = swatchColor.value.querySelectorAll(
        "label[data-vhandle]"
      );
      labelElements.forEach((element) => {
        element.classList.remove("sd");
      });

      //add class sd
      const elLabel = swatchColor.value.querySelector(
        `label[data-vhandle='${toDataHandlerSwatch(color.name)}']`
      );
      elLabel.classList.add("sd");
    }
    function toDataHandlerSwatch(colorName) {
      return (
        "swatch-" +
        removeVietnameseTones(colorName).toLowerCase().split(" ").join("-")
      );
    }

    // minusQuantity
    function minusQuantity() {
      if (sizeSelected.value) {
        if (quantitySelect.value > 1) quantitySelect.value--;
      }
    }
    function plusQuantity() {
      if (sizeSelected.value) {
        if (sizeSelected.value.quantity > quantitySelect.value)
          quantitySelect.value++;
      }
    }

    onMounted(() => {
      // if (props.colors[0]) {
      //   selectSwatch(props.colors[0]);
      // }
      for (const color of props.colors) {
        if (!isSoldOutBySwatch(color)) {
          selectSwatch(color);
          break;
        }
      }
    });
    // watch(
    //   () => colorSelected.value,
    //   (newColor) => {
    //     // (newColor) => {
    //     console.log(newColor);
    //     for (const size of newColor.sizes) {
    //       if (!isSoldOutBySize(size)) {
    //         selectSize(size);
    //         break;
    //       }
    //     }
    //   }
    // );
    // watchEffect(() => {
    //   console.log("hihi", colorSelected.value);
    //   if (Object.values(colorSelected.value).length !== 0) {
    //     for (const size of colorSelected.value.sizes) {
    //       if (!isSoldOutBySize(size)) {
    //         selectSize(size);
    //         break;
    //       }
    //     }
    //   }
    // });

    return {
      quantitySelect,
      selectSwatch,
      colorSelected,
      swatchColor,
      swatchSize,
      toDataHandlerSwatch,
      isSoldOutBySwatch,
      sizeSelected,
      selectSize,
      isSoldOutBySize,
      minusQuantity,
      plusQuantity,
      addToCart,
      BuyProduct,
    };
  },
};
</script>
<style scoped>
.error-hide {
  display: none;
}
.error-messages {
  padding-top: 10px;
  color: #e4393c;
  display: block;
}
.swatch {
  padding: 15px 0;
  width: 100%;
  float: left;
  border-bottom: 1px dotted #dfe0e1;
}
.swatch .header {
  display: flex;
  align-items: center;
}
.swatch .header {
  margin: 0 0 8px;
  font-size: 13px;
  text-align: left;
  line-height: initial;
}
.swatch .header > span {
  margin-left: 3px;
}
.swatch .select-swap {
  display: inline-block;
  vertical-align: middle;
}
.swatch .swatch-element {
  display: inline-block;
  margin-right: 8px;
  position: relative;
  vertical-align: bottom;
}
.swatch-element.soldout {
  opacity: 0.4;
}
.swatch input {
  display: none;
}
.swatch .swatch-element label {
  display: block;
  margin: 0;
  background: #fff;
  min-width: 40px;
  height: 40px;
  line-height: 40px;
  position: relative;
  border: 1px solid #e5e5e5;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
}
.swatch .swatch-element label.sd {
  border: 1px solid #e4393c;
}
.swatch .swatch-element.color label {
  width: 35px;
  height: 35px;
  min-width: 35px;
  padding: 3px;
  border-radius: 50%;
}
.swatch .swatch-element.color label.sd {
  background: 0 0;
}
.swatch .swatch-element.color img {
  display: block;
  width: 100%;
  height: 100%;
  margin-top: 0;
  font-size: 0;
  border-radius: 50%;
  border: 1px solid #f5f5f5;
  background-image: var(--bg-swatch);
  background-size: contain;
  background-position: center;
}
.swatch .swatch-element.color.soldout label img {
  /* overflow: hidden; */
  position: relative;
}
.swatch .swatch-element.color.soldout label img:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 50%;
  height: 50%;
  background: url(//theme.hstatic.net/200000031420/1000879437/14/sold_out.png?v=28)
    no-repeat;
  background-size: contain;
}
.swatch:last-child {
  border: none;
}
.swatch .header {
  margin: 0 0 8px;
  font-size: 13px;
  text-align: left;
  line-height: initial;
}
.swatch .header {
  display: flex;
  align-items: center;
}
.swatch .header > span {
  margin-left: 3px;
}
.size-chart {
  border: none;
  background: none;
  font-weight: bold;
  margin-left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.size-chart svg {
  margin-right: 5px;
}
.swatch .select-swap {
  display: inline-block;
  vertical-align: middle;
}
.swatch .swatch-element {
  display: inline-block;
  margin-right: 8px;
  position: relative;
  vertical-align: bottom;
}
.swatch .swatch-element label.sd {
  border: 1px solid #e4393c;
}
.swatch .img-check {
  display: none;
  position: absolute;
  right: 0;
  bottom: 0;
}
.swatch-element label.sd img.img-check {
  display: block;
}
.quantity-area {
  float: left;
  width: 135px;
  display: flex;
  margin-right: 15px;
}
.quantity-area .qty-btn {
  background: #fff;
  float: left;
  border: 1px solid #e1e1e1;
  cursor: pointer;
  font-weight: 600;
  outline: none;
  height: 45px;
  width: 45px;
  text-align: center;
  border-radius: 0;
  font-size: 20px;
  color: black;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: unset;
}
.quantity-area .quantity-selector {
  background: #fff;
  font-weight: 600;
  height: 45px;
  text-align: center;
  width: 45px;
  border: 1px solid #e1e1e1;
  border-left: none;
  border-right: none;
  border-radius: 0;
  float: left;
  -webkit-appearance: none;
  font-size: 15px;
  color: black;
  padding: 0;
}
.wrap-addcart {
  flex: 1;
}
.row-flex {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
}
.row-flex .add-to-cart-style-qv,
.row-flex .add-to-cart-style,
.row-flex .buynow-style {
  background: var(--bgshop);
  color: #fff;
  height: 45px;
  width: calc(50% - 15px);
  flex: 0 0 calc(50% - 15px);
  margin-right: 15px;
  display: block;
  border: 1px solid var(--bgshop);
  max-width: 250px;
}
.row-flex .add-to-cart-style-qv span,
.row-flex .add-to-cart-style span,
.row-flex .buynow-style span {
  font-weight: bold;
  letter-spacing: 0.5px;
}
.row-flex .buynow-style {
  background: transparent;
  color: var(--bgshop);
}
</style>
