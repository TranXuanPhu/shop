<template>
  <section id="product-template" class="pd-top-60" v-if="!isLoading">
    <div class="container">
      <div class="row d-flex">
        <div
          class="col-lg-5 col-md-6 col-sm-6 col-xs-12 order-mb-1 d-flex-wrap d-flex gallery-product-template"
        >
          <Splide
            aria-labelledby="thumbnail-example-heading"
            :options="mainOptions"
            ref="main"
          >
            <SplideSlide v-for="(slide, index) in slides" :key="index">
              <img
                :src="`data:${slide.img.contentType};base64,${slide.img.data}`"
                :alt="slide.name"
              />
            </SplideSlide>
          </Splide>

          <!-- <Splide
            aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
            :options="thumbsOptions"
            ref="thumbs"
          >
            <SplideSlide v-for="(slide, index) in slides" :key="index">
              <img
                :src="`data:${slide.img.contentType};base64,${slide.img.data}`"
                :alt="slide.name"
              />
            </SplideSlide>
          </Splide> -->
        </div>
        <div class="col-lg-7 col-md-6 col-sm-6 col-xs-12 order-mb-2">
          <div class="product-content">
            <div class="pro-content-head clearfix">
              <h1>{{ product.name }}</h1>
              <div class="d-flex product-info">
                <div class="pro-brand">
                  <span class="title"> Thương hiệu: </span>
                  <router-link
                    :to="{
                      name: 'Collections',
                      params: { type: 'vendor' },
                      query: {
                        q: removeVietnameseTones(product.vendor)
                          .replace(' ', '-')
                          .toLowerCase(),
                      },
                    }"
                  >
                    {{ product.vendor }}
                  </router-link>
                </div>
                <span class="line-info">|</span>
                <div class="pro-type">
                  <span class="title">Loại: </span>
                  <router-link
                    :to="{
                      name: 'Collections',
                      params: { type: 'types' },
                      query: { q: 'san-pham-moi' },
                    }"
                  >
                    {{ product.vendor }}
                  </router-link>
                </div>
              </div>
              <div id="pro-price">
                <span class="price-now">{{
                  isInStock() ? toMoneyString(product.price) : toMoneyString(0)
                }}</span>
                <span class="price-compare"></span>
                <div class="available-pro">
                  <span class="title">Tình trạng: </span>
                  <span class="status">{{
                    isInStock() ? "Còn hàng" : "Hết hàng"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div id="add-item-form" class="variants clearfix">
            <SelectSwatchTemplate
              :colors="product.colors"
              :productId="product._id"
            />
            <div class="row"></div>
          </div>
        </div>
        <div
          class="col-md-12 col-sm-12 col-xs-12 order-mb-4 mg-top-30 mg-top-0-mb"
        >
          <div class="product-description-tab">
            <div class="scroll-nav-tab scroll-tab hidden-xs">
              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active">
                  <a
                    class="show"
                    href="javascript:void(0)"
                    data-href="#pro-tab-1"
                    data-toggle="tab"
                    role="tab"
                    aria-selected="true"
                  >
                    <span>Mô tả sản phẩm</span>
                  </a>
                </li>
                <!-- <li role="presentation">
                  <a
                    class=""
                    href="javascript:void(0)"
                    data-href="#pro-tab-4"
                    data-toggle="tab"
                    role="tab"
                    aria-selected="true"
                  >
                    <span>Bình luận</span>
                  </a>
                </li> -->
              </ul>
            </div>
            <div class="tab-pane active content-entry">
              <div class="more-description">
                <p><strong>ESSENTIAL TEE 2022</strong></p>
                <ul>
                  <li><p>Kích thước: M | L | XL&nbsp;&nbsp;</p></li>
                  <li><p>Chất liệu: 100% Cotton&nbsp;2 chiều</p></li>
                  <li><p>Chi tiết được thêu</p></li>
                  <li>
                    <p>
                      Khả năng chống tia UV cao gấp đôi tiêu chuẩn thông hành
                    </p>
                  </li>
                  <li><p>Không chứa hóa chất độc có hại cho sức khỏe</p></li>
                </ul>
                <p>
                  {{ product.description }}
                </p>

                <p>Shopee: heyyoustudio.vn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import url from "../../api/url.js";
import { removeVietnameseTones, toMoneyString } from "../../helpers/utils.js";
import SelectSwatchTemplate from "./SelectSwatchTemplate.vue";
export default {
  name: "product-details",
  components: {
    Splide,
    SplideSlide,
    SelectSwatchTemplate,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const main = ref(null);
    const thumbs = ref(null);
    const slides = ref([]);
    const isLoading = ref(true);
    const product = ref({});
    const mainOptions = {
      type: "loop",
      perPage: 1,
      perMove: 1,
      gap: "1rem",
      pagination: false,
      start: 0,
    };
    const thumbsOptions = {
      type: "slide",
      rewind: true,
      gap: "1rem",
      pagination: false,
      fixedWidth: 110,
      fixedHeight: 70,
      cover: true,
      focus: "center",
      isNavigation: true,
      updateOnMove: true,
      breakpoints: {
        600: {
          fixedWidth: 60,
          fixedHeight: 44,
        },
      },
    };
    onMounted(() => {
      const thumbsSplide = thumbs.value?.splide;
      if (thumbsSplide) {
        main.value?.sync(thumbsSplide);
      }
    });

    const isInStock = onMounted(() => {
      let quantity = 0;
      if (product.value.colors) {
        product.value.colors.forEach((color) => {
          color.sizes.forEach((size) => {
            quantity = quantity + size.quantity;
          });
        });
      }

      return quantity > 0;
    });

    async function getProduct() {
      store.dispatch("setLoading", true);
      try {
        const response = await axios.get(
          `${url.products}/${route.params.slug}`
        );
        isLoading.value = false;
        product.value = response.data.product;

        let imagesTmp = [];
        product.value.colors.forEach((color) => {
          imagesTmp.push(color.image);
        });
        slides.value = [...imagesTmp, ...product.value.images];

        // console.log("product.value", slides.value);
        store.dispatch("setLoading", false);
        console.log(product.value);
      } catch (error) {
        console.error("getProduct", error);
        store.dispatch("setLoading", false);
      }
    }
    console.log(main.value);
    getProduct();
    return {
      main,
      thumbs,
      slides,
      mainOptions,
      thumbsOptions,
      isLoading,
      product,
      removeVietnameseTones,
      toMoneyString,
      isInStock,
    };
  },
};
</script>
<style scoped>
#product-template #sl-product-thumb {
  position: relative;
  width: 15%;
}
#product-template .product-content h1 {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  text-transform: capitalize;
}
#product-template .product-info {
  margin-bottom: 10px;
  line-height: 20px;
}
#product-template .product-info .title {
  font-weight: bold;
}
#product-template .product-info .line-info {
  margin: 0 10px;
}
#product-template .product-info .title {
  font-weight: bold;
}
#product-template #pro-price {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
#product-template #pro-price .price-now {
  font-size: 22px;
  color: #ff0000;
  font-weight: 600;
  margin-right: 15px;
}
#product-template #pro-price .price-compare {
  margin-right: 15px;
}
#product-template .available-pro {
  font-size: 16px;
}
#product-template .available-pro .title {
  font-weight: bold;
}
#product-template .available-pro .status {
  color: #000000;
}
#product-template .product-description-tab .nav {
  border-bottom: 1px solid #e4e7e6;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 35px;
  /* float: left; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
#product-template .product-description-tab .nav li.active,
#product-template .product-description-tab .nav li:hover {
  border-top: 3px solid #000;
}
#product-template .product-description-tab .nav li {
  background: #f7f7fb;
  margin: 0 -1px 0 0;
  float: left;
  position: relative;
  display: block;
}
#product-template .product-description-tab .nav li a {
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  margin: 0;
  border: 1px solid #e4e7e6;
  border-bottom: 0;
  padding: 12px 15px 10px;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
  -webkit-transition: none;
  -moz-transition: none;
  -o-transition: none;
  display: block;
  line-height: 1.42857143;
}
#product-template .product-description-tab .nav li.active a,
#product-template .product-description-tab .nav li:hover a {
  border: 1px solid #e4e7e6;
  border-width: 0 1px;
  color: #000;
  padding-bottom: 11px;
  padding-top: 10px;
  margin-bottom: -1px;
  cursor: pointer;
  background-color: #fff;
}
.content-entry p {
  line-height: 21px;
  margin-bottom: 15px;
}
</style>
