<template>
  <section id="section-collection-tab" class="pd-top-60">
    <div class="container">
      <div class="top-title">
        <h2 class="title-section">
          <span>SHOP</span>
        </h2>
      </div>

      <div class="tab-pane-show">
        <ListProducts></ListProducts>
      </div>
    </div>
  </section>
</template>
<script>
import { useStore } from "vuex";
import ListProducts from "../components/product/ListProducts.vue";
export default {
  name: "home-page",
  components: { ListProducts },
  setup() {
    const store = useStore();

    store.dispatch("products/getAllProducts");
  },
};
</script>
<style scoped>
.top-title {
  margin-bottom: 30px;
  text-align: center;
}
.top-title .title-section {
  text-align: center;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.top-title .title-section span {
  display: flex;
  align-items: center;
  font-size: 22px;
  text-transform: uppercase;
  font-weight: 700;
}
</style>
