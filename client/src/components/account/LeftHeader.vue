<template>
  <li class="d-flex d-flex-center mg-bottom-15">
    <router-link
      :to="{
        path: info.href,
        query: info.view ? { view: info.view } : {},
      }"
      class="d-flex d-flex-center"
    >
      <i :class="info.icon"></i>
      <span>{{ info.title }}</span>
    </router-link>
    <!-- <a class="d-flex d-flex-center" href="/account">
     
    </a> -->
  </li>
</template>
<script>
export default {
  name: "left-header-template",
  props: {
    info: {
      type: Object,
    },
  },
  setup() {},
};
</script>
<style scoped>
.d-flex-center {
  align-items: center;
}
.AccountContent li {
  display: flex;
  align-items: center;
}
.AccountContent li a {
  width: 100%;
  padding: 3px 0;
}
.AccountContent li a span {
  margin-left: 10px;
  line-height: 20px;
}
</style>
