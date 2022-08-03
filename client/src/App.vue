<template>
  <main>
    <NavigationHeader />
    <LoadingTemplate v-if="isLoading" />
    <router-view v-show="!isLoading" />
    <NavigationFooter />
    <ErrorTemplate v-if="isModalError" />
    <SuccessTemplate v-if="isModalSuccess" />
  </main>
</template>

<script>
//import { ref } from "vue";
import { useStore } from "vuex";
import NavigationHeader from "./components/NavigationHeader.vue";
import NavigationFooter from "./components/NavigationFooter.vue";
import LoadingTemplate from "./views/LoadingTemplate.vue";
import ErrorTemplate from "./components/modal/Error.vue";
import SuccessTemplate from "./components/modal/Success.vue";
import "@splidejs/vue-splide/css";
import { computed } from "vue";
export default {
  name: "App",
  components: {
    NavigationHeader,
    NavigationFooter,
    LoadingTemplate,
    ErrorTemplate,
    SuccessTemplate,
  },
  setup() {
    const store = useStore();

    const isLoading = computed(() => store.getters["getIsLoading"]);
    const isModalError = computed(() => store.getters["getIsModalError"]);
    const isModalSuccess = computed(() => store.getters["getIsModalSuccess"]);

    //initial call url
    const isLoggedIn = store.getters["user/getStatusLoggedIn"];
    if (isLoggedIn) {
      store.dispatch("cart/getItemCarts");
    }

    return { isLoading, isModalError, isModalSuccess };
  },
};
</script>

<style>
main {
  background: #f8f8f8;
  padding-top: var(--height-head);
  min-height: 60.5vh;
}
</style>
