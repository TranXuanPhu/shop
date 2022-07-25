<template>
  <main>
    <NavigationHeader />
    <LoadingTemplate v-if="isLoading" />
    <router-view v-show="!isLoading" />
    <ErrorTemplate v-if="isModalError" />
    <SuccessTemplate v-if="isModalSuccess" />
  </main>
</template>

<script>
//import { ref } from "vue";
import { useStore } from "vuex";
import NavigationHeader from "./components/NavigationHeader.vue";
import LoadingTemplate from "./views/LoadingTemplate.vue";
import ErrorTemplate from "./components/modal/Error.vue";
import SuccessTemplate from "./components/modal/Success.vue";
import "@splidejs/vue-splide/css";
import { computed } from "vue";
export default {
  name: "App",
  components: {
    NavigationHeader,
    LoadingTemplate,
    ErrorTemplate,
    SuccessTemplate,
  },
  setup() {
    const store = useStore();

    const isLoading = computed(() => store.getters["getIsLoading"]);
    const isModalError = computed(() => store.getters["getIsModalError"]);
    const isModalSuccess = computed(() => store.getters["getIsModalSuccess"]);

    return { isLoading, isModalError, isModalSuccess };
  },
};
</script>

<style>
main {
  padding-top: var(--height-head);
  min-height: 60.5vh;
}
</style>
