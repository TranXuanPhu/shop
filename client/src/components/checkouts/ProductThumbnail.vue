<template>
  <tr class="product">
    <td class="product-image">
      <div class="product-thumbnail">
        <div class="product-thumbnail-wrapper">
          <img
            class="product-thumbnail-image"
            :src="`data:${item.color.image.img.contentType};base64,${item.color.image.img.data}`"
            :alt="item.color.image.name"
          />
        </div>
        <span class="product-thumbnail-quantity" aria-hidden="true">{{
          item.quantity
        }}</span>
      </div>
    </td>
    <td class="product-description">
      <span class="product-description-name order-summary-emphasis">{{
        item.product.name
      }}</span>

      <span class="product-description-variant order-summary-small-text">
        {{ getDescription() }}
      </span>
    </td>
    <td class="product-quantity visually-hidden">{{ item.quantity }}</td>
    <td class="product-price">
      <span class="order-summary-emphasis">{{
        toMoneyString(item.product.price)
      }}</span>
    </td>
  </tr>
</template>
<script>
import { toMoneyString } from "../../helpers/utils.js";
export default {
  name: "product-thumbnail-template",
  props: { item: { type: Object } },
  setup(props) {
    function getDescription() {
      return props.item.color.name + " / " + props.item.size;
    }

    return { getDescription, toMoneyString };
  },
};
</script>
<style scoped>
td:first-child,
th:first-child {
  padding-left: 0;
  text-align: left;
}
td:last-child,
th:last-child {
  text-align: right;
}
.sidebar .sidebar-content .order-summary .product td {
  padding-top: 1em;
}
.sidebar .sidebar-content .order-summary .product:first-child td {
  padding-top: 0;
}
.sidebar
  .sidebar-content
  .order-summary
  .product
  .product-image
  .product-thumbnail {
  width: 4.6em;
  height: 4.6em;
  border-radius: 8px;
  background: #fff;
  position: relative;
}
.sidebar
  .sidebar-content
  .order-summary
  .product
  .product-image
  .product-thumbnail
  .product-thumbnail-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}
.sidebar
  .sidebar-content
  .order-summary
  .product
  .product-image
  .product-thumbnail
  .product-thumbnail-wrapper
  .product-thumbnail-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
}
.sidebar
  .sidebar-content
  .order-summary
  .product
  .product-image
  .product-thumbnail
  .product-thumbnail-quantity {
  font-size: 0.85714em;
  font-weight: 500;
  white-space: nowrap;
  padding: 0.15em 0.65em;
  border-radius: 2em;
  background-color: rgba(153, 153, 153, 0.9);
  color: #fff;
  position: absolute;
  right: -0.75em;
  top: -0.75em;
  z-index: 2;
}
.sidebar
  .sidebar-content
  .order-summary
  .product
  .product-image
  .product-thumbnail::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 10%) inset;
}
.sidebar .sidebar-content .order-summary .product .product-description {
  width: 100%;
}
.sidebar .sidebar-content .order-summary .product:first-child td {
  padding-top: 0;
}
.sidebar .sidebar-content .order-summary .order-summary-emphasis {
  font-weight: 500;
  color: #4b4b4b;
}
.sidebar
  .sidebar-content
  .order-summary
  .product
  .product-description
  .product-description-name,
.sidebar
  .sidebar-content
  .order-summary
  .product
  .product-description
  .product-description-variant,
.sidebar
  .sidebar-content
  .order-summary
  .product
  .product-description
  .product-description-property {
  display: block;
}
.sidebar .sidebar-content .order-summary .order-summary-small-text {
  font-size: 0.85714em;
  color: #969696;
}
.sidebar .sidebar-content .order-summary .product .product-price {
  white-space: nowrap;
}
.sidebar .sidebar-content .order-summary .order-summary-emphasis {
  font-weight: 500;
  color: #4b4b4b;
}
</style>
