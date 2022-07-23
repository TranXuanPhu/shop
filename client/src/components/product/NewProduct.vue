<template>
  <section class="pd-top-30 formkit-userbox" style="max-width: 55.375em">
    <FormKit
      type="form"
      :submit-attrs="{ inputClass: 'button' }"
      submit-label="Tạo mới sản phẩm"
      @submit="handleNewProduct"
    >
      <FormKit
        type="text"
        label="Tên sản phẩm"
        name="name"
        validation="required"
        validation-visibility="dirty"
        :validation-messages="{}"
      />
      <FormKit
        type="text"
        label="Thương hiệu"
        name="vendor"
        value="Khác"
        validation="required"
        validation-visibility="dirty"
        :validation-messages="{}"
      />
      <FormKit
        type="number"
        label="Giá sản phẩm"
        name="price"
        value="99000"
        step="1000"
        validation-visibility="dirty"
        :validation-messages="{}"
      />
      <FormKit
        type="radio"
        label="Chọn style"
        :options="{
          other: 'Khác',
          new: 'Sản phẩm mới',
        }"
        help="chọn loại sản phẩm"
        validation="required"
        name="type"
        validation-visibility="live"
        :validation-messages="{
          required: 'chọn loại của sản phẩm.',
        }"
      />
      <FormKit
        type="text"
        label="Màu sản phẩm"
        name="colors"
        value="Back,White,Blue Bird,Minimal Gray,Dream Blue,Adobe Rose,Paradise Pink,
Banana Yellow,Orange Tiger,Purple Ash"
        validation="required"
        validation-visibility="dirty"
        :validation-messages="{}"
      />
      <FormKit
        type="number"
        label="Số lượng sản phẩm"
        name="quantity"
        value="1"
        step="1"
        validation="required|min:1"
        validation-visibility="dirty"
        :validation-messages="{
          min: 'Số lượng sản phẩm phải ít nhất là 1.',
        }"
      />
      <FormKit
        type="checkbox"
        label="Kích thước"
        :options="['M', 'L', 'XL']"
        help="chọn kích thước của sản phẩm"
        validation="required|min:1"
        name="sizes"
        validation-visibility="live"
        :validation-messages="{
          required: 'chọn ít nhất 1 kích thước.',
        }"
      />
      <FormKit
        type="radio"
        label="Chọn style"
        :options="{
          tee: 'TEE',
          sweater: 'SWEATER',
          hoodie: 'HOODIE',
          jacket: 'JACKET',
          pant: 'PANT',
        }"
        help="chọn style của sản phẩm"
        validation="required"
        name="style"
        validation-visibility="live"
        :validation-messages="{
          required: 'chọn style của sản phẩm.',
        }"
      />

      <FormKit
        type="textarea"
        label="Mô tả sản phẩm"
        name="description"
        placeholder="Nhập chi tiết sản phẩm"
        validation="required"
        validation-visibility="dirty"
        :validation-messages="{}"
      />
      <FormKit
        type="file"
        label="Hình ảnh sản phẩm"
        accept=".jpg,.png,.jpeg"
        help="chọn một hoặc nhiều hình ảnh sản phẩm, mỗi hình sản phẩm là một kiểu màu được sắp xếp theo thứ tự màu. "
        name="images"
        multiple
        validation="max:20"
        :validation-messages="{
          max: 'Không thể chọn nhiều hơn 20 ảnh.',
        }"
      />
    </FormKit>
  </section>
</template>
<script>
import axios from "axios";
import url from "../../api/url.js";
export default {
  name: "new-product-template",
  setup() {},
  methods: {
    handleNewProduct(data) {
      const body = new FormData();
      console.log(data);
      body.append("name", data.name);
      body.append("colors", data.colors);
      body.append("description", data.description);
      body.append("sizes", data.sizes.toString());
      body.append("vendor", data.vendor);
      body.append("quantity", data.quantity);
      body.append("price", data.price);
      body.append("style", data.style);
      body.append("type", data.type);
      data.images.forEach((fileItem) => {
        body.append("images", fileItem.file);
      });

      axios
        .post(url.products, body, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("handleNewProduct: success", response);
        })
        .catch((error) => {
          console.error("handleNewProduct", error);
        });
    },
  },
};
</script>
