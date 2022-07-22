<template>
  <main v-if="!isLoading">
    <NavigationHeader />
    <router-view />
  </main>
  <div v-if="isLoading">
    <h1>loading ......</h1>
  </div>
</template>

<script>
import { ref } from "vue";
import NavigationHeader from "./components/NavigationHeader.vue";

export default {
  name: "App",
  components: { NavigationHeader },
  setup() {
    const isLoading = ref(false);
    return { isLoading };
  },
};
</script>

<style>
main {
  padding-top: var(--height-head);
  min-height: 60.5vh;
}
</style>
