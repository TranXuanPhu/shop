<template>
  <ul class="cart-wrap" data-line="1">
    <li class="item-info">
      <div class="item-img">
        <a href="/products/essential-tee-2022"
          ><img
            src="  //product.hstatic.net/200000031420/product/n_2_ab76ddd40a104d76bbff4be8c908e91e_medium.jpg"
            alt="ESSENTIAL TEE 2022"
        /></a>
      </div>
      <div class="item-title">
        <a href="/products/essential-tee-2022">ESSENTIAL TEE 2022</a>
        <span class="item-option">
          <span>Black / M</span>
        </span>
        <span class="item-option" data-sku="undefined">
          <span>SKU: </span>
        </span>
        <span class="item-option">
          <span class="item-price">
            <span class="money">99,000₫</span>
          </span>
        </span>
      </div>
    </li>
    <li class="item-qty">
      <div class="quantity-area-cartmini">
        <input
          type="button"
          value="–"
          @click="decrementQuantity"
          class="qty-btn btn-left-quantity"
        /><input
          type="text"
          id="quantity_cart"
          name="quantity"
          value="1"
          min="1"
          class="quantity-mini"
        /><input
          type="button"
          value="+"
          @click="incrementQuantity"
          class="qty-btn btn-right-quantity"
        />
      </div>
      <div class="item-remove">
        <span class="remove-wrap">
          <a @click="deleteItemCart()" href="#">Xóa</a>
        </span>
      </div>
    </li>
    <li class="item-price">
      <span class="amount full-price">
        <span class="money">99,000₫</span>
      </span>
    </li>
  </ul>
</template>
<script>
export default {
  name: "cart-wrap-template",
  setup() {
    function incrementQuantity() {
      console.log("incrementQuantity");
      // store.dispatch("cart/addProductToCart", props.item._id);
    }
    function decrementQuantity() {
      console.log("decrementQuantity");
      //   if (props.item.quantity > 1)
      //     store.dispatch("cart/decrementProductQuantity", props.item._id);
    }
    function deleteProductCart() {
      //store.dispatch("cart/deleteProductInCart", props.item._id);
    }

    return { incrementQuantity, decrementQuantity, deleteProductCart };
  },
};
</script>
<style scoped>
.item-wrap ul {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}
.item-wrap ul li.item-info {
  display: flex;
}
.item-wrap ul li:first-child {
  width: 60%;
}
.item-wrap ul li.item-info .item-img {
  max-width: 100px;
}
.item-wrap ul li.item-info .item-title {
  margin-left: 15px;
}
.item-wrap ul li.item-info .item-title > a {
  display: block;
  font-size: 16px;
  font-weight: 700;
}
.item-wrap ul li.item-info .item-title .item-option {
  display: block;
  margin-top: 5px;
}
.item-option[data-sku="undefined"],
del[data-compare="0₫"] {
  display: none !important;
}

.item-wrap ul .item-qty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex: 0 0 20%;
  align-items: center;
}
.quantity-area-cartmini {
  float: left;
  width: 100px;
  display: flex;
}
.quantity-area-cartmini .qty-btn {
  background: #fff;
  float: left;
  border: 1px solid #e1e1e1;
  cursor: pointer;
  font-weight: 600;
  outline: none;
  height: 33px;
  width: 33px;
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
.quantity-area-cartmini .quantity-mini {
  background: #fff;
  font-weight: 600;
  height: 33px;
  text-align: center;
  width: 33px;
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
.item-wrap ul .item-qty .item-remove {
  margin-top: 10px;
}
.item-wrap ul .item-qty .item-remove a {
  text-decoration: underline;
  font-weight: bold;
}
.item-wrap ul li.item-price {
  flex: 0 0 20%;
  text-align: right;
}
.item-wrap ul li.item-price span {
  font-weight: bold;
  color: #e70303;
}
</style>
