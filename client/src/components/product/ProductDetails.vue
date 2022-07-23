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
                      name: 'collections',
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
                      name: 'collections',
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
            <SelectSwatchTemplate :colors="product.colors" />
            <div class="row"></div>
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
import url from "../../api/url.js";
import { removeVietnameseTones, toMoneyString } from "../../utils/utils.js";
import SelectSwatchTemplate from "../SelectSwatchTemplate.vue";
export default {
  name: "product-details",
  components: {
    Splide,
    SplideSlide,
    SelectSwatchTemplate,
  },
  setup() {
    const route = useRoute();
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

        console.log(product.value);
      } catch (error) {
        console.error("getProduct", error);
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
</style>
