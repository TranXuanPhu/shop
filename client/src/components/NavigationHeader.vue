<template>
  <header id="header" class="site-header">
    <div id="site-header-center">
      <div class="container">
        <div class="row-left-list d-flex d-flex-center">
          <!-- left -->
          <div class="logo col-md-2 col-xs-6 col-sm-4 pd-right-0">
            <router-link :to="{ name: 'Home' }">
              <img
                class="dt-width-auto"
                height="30"
                width="185"
                src="https://file.hstatic.net/200000031420/file/logo_heyyou_website-04_cfe6eb8b64f7430db789de966b4003b3.png"
                alt="heyyoustudiovn"
              />
            </router-link>
          </div>

          <!-- center -->
          <nav class="col-md-8 hidden-xs hidden-sm pd-right-0">
            <ul id="menu-desktop" class="menu-desk">
              <li class="active">
                <router-link :to="{ name: 'Home' }"> TRANG CHỦ </router-link>
              </li>
              <li class=" ">
                <a href="#">
                  SHOP<i class="fa-chevron-down" aria-hidden="true"></i>
                </a>

                <div class="sub_top_menu">
                  <ul class="sub_menu_dropdown">
                    <li class="">
                      <router-link
                        :to="{ name: 'Collections', params: { type: 'all' } }"
                      >
                        All
                      </router-link>
                    </li>
                    <li class="">
                      <router-link
                        :to="{ name: 'Collections', params: { type: 'tee' } }"
                      >
                        TEE
                      </router-link>
                    </li>
                    <!-- <li class="">
                      <router-link
                        :to="{
                          name: 'Collections',
                          params: { type: 'sweater' },
                        }"
                      >
                        SWEATER
                      </router-link>
                    </li>
                    <li class="">
                      <router-link
                        :to="{
                          name: 'Collections',
                          params: { type: 'hoodie' },
                        }"
                      >
                        HOODIE
                      </router-link>
                    </li> -->

                    <li class="">
                      <router-link
                        :to="{
                          name: 'Collections',
                          params: { type: 'jacket' },
                        }"
                      >
                        JACKET
                      </router-link>
                    </li>

                    <li class="">
                      <router-link
                        :to="{
                          name: 'Collections',
                          params: { type: 'pant' },
                        }"
                      >
                        PANT
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class=" ">
                <a href="/pages/about-us"> GIỚI THIỆU</a>
              </li>
            </ul>
          </nav>

          <!-- right -->
          <div
            class="col-md-2 group-icon-header col-xs-3 col-sm-4 pd-right-0 pd-0-mb"
          >
            <div class="cart-login-search align-items-center">
              <ul class="list-inline list-unstyled mb-0">
                <li class="list-inline-item mr-0">
                  <a
                    href="/search"
                    class="search js-search-desktop"
                    data-original-title="Tìm kiếm"
                    data-tooltip="tooltip"
                  >
                    <img
                      width="20"
                      height="20"
                      src="//theme.hstatic.net/200000031420/1000879437/14/searcg-icon.svg?v=28"
                      alt="Tìm kiếm"
                    />
                  </a>
                </li>
                <li class="list-inline-item mr-0 hidden-xs hidden-sm">
                  <router-link
                    :to="{ name: isLoggedIn ? 'Account' : 'Login' }"
                    :data-original-title="
                      isLoggedIn ? loggedUser?.fullName : 'Đăng nhập'
                    "
                    class="login"
                    data-tooltip="tooltip"
                  >
                    <img
                      width="20"
                      height="20"
                      src="//theme.hstatic.net/200000031420/1000879437/14/user-account.svg?v=28"
                      alt="Tài khoản"
                    />
                  </router-link>
                </li>
                <li class="list-inline-item mr-0">
                  <a
                    href="/pages/danh-sach-yeu-thich"
                    data-original-title="Danh sách yêu thích"
                    class="login"
                    data-tooltip="tooltip"
                  >
                    <img
                      width="20"
                      height="20"
                      src="//theme.hstatic.net/200000031420/1000879437/14/heart.svg?v=28"
                      alt="Danh sách yêu thích"
                    />
                    <span class="js-number-like number-like">0</span>
                  </a>
                </li>
                <li class="list-inline-item mr-0">
                  <router-link
                    :to="{ name: 'Cart' }"
                    class="cart js-call-minicart"
                    data-original-title="Giỏ hàng"
                    data-tooltip="tooltip"
                  >
                    <img
                      width="20"
                      height="20"
                      src="//theme.hstatic.net/200000031420/1000879437/14/shopping-cart.svg?v=28"
                      alt="Giỏ hàng"
                    />
                    <span class="js-number-cart number-cart">{{
                      totalItemsCart
                    }}</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "navigation-template",
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => store.getters["user/getStatusLoggedIn"]);
    const loggedUser = computed(() => store.getters["user/getLoggedUser"]);
    const totalItemsCart = computed(() => store.getters["cart/getTotalItems"]);
    return { isLoggedIn, loggedUser, totalItemsCart };
  },
};
</script>
<style scoped>
#header {
  z-index: 3000;
  height: var(--height-head);
  position: fixed;
  left: 0;
  width: 100%;
  top: 0 !important;
}
#header #site-header-center {
  padding: 10px 0;
  background: #fff;
  box-shadow: 0px 0px 3px 0px #ccc;
  min-height: var(--height-head);
}
.row-left-list {
  margin-left: -15px;
}

.d-flex-center {
  align-items: center;
}
.d-flex {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
}

#header #site-header-center .logo img {
  max-width: 185px;
  display: block;
}

.dt-width-auto {
  width: auto;
  height: auto;
}
#header #site-header-center .menu-desk {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
}
#header #site-header-center .menu-desk > li {
  padding: 0 12px;
}
#header #site-header-center .menu-desk > li {
  padding: 0 15px;
  position: static;
}
#header #site-header-center .menu-desk > li.active > a {
  color: var(--colorshophover);
}
#header #site-header-center .menu-desk > li > a {
  font-size: 16px;
  font-weight: 550;
  text-transform: unset;
  padding: 10px 5px;
  display: block;
}
#header #site-header-center .menu-desk > li > a i {
  font-size: 10px;
  font-weight: 300;
  margin-left: 5px;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -o-transition: 0.2s;
  transition: 0.2s;
}
.fa-chevron-down {
  position: relative;
}
.fa-chevron-down:before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 7px;
  height: 7px;
  border-bottom: 2px solid;
  border-right: 2px solid;
  transform: rotate(45deg);
  left: 4px;
  top: 0;
}
#header #site-header-center .menu-desk > li:hover > .sub_top_menu {
  opacity: 1;
  visibility: visible;
  margin-top: 0;
}
#header #site-header-center .menu-desk > li .sub_top_menu {
  padding-top: 10px;
  position: absolute;
  z-index: 999;
  min-width: 150px;
  margin-top: 30px;
  opacity: 0;
  visibility: hidden;
  -webkit-transform-origin: 0 0 0;
  -moz-transform-origin: 0 0 0;
  -o-transform-origin: 0 0 0;
  -ms-transform-origin: 0 0 0;
  transform-origin: 0 0 0;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  top: 100%;
}
#header #site-header-center .menu-desk > li .sub_top_menu .sub_menu_dropdown {
  background: #fff;
  -webkit-box-shadow: 0px 2px 20px rgb(0 0 0 / 20%);
  -moz-box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
  -ms-box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 2px 20px rgb(0 0 0 / 20%);
}
#header
  #site-header-center
  .menu-desk
  > li
  .sub_top_menu
  .sub_menu_dropdown
  li {
  position: relative;
}
#header
  #site-header-center
  .menu-desk
  > li
  .sub_top_menu
  .sub_menu_dropdown
  li
  a {
  padding: 10px 10px 0 10px;
  white-space: nowrap;
  text-align: left;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#header #site-header-center .group-icon-header ul {
  display: flex;
  justify-content: flex-end;
}

#header #site-header-center .group-icon-header ul li {
  vertical-align: top;
  width: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
#header #site-header-center .group-icon-header ul li a {
  text-decoration: none;
  color: #000;
  display: block;
  position: relative;
}
#header #site-header-center .group-icon-header ul li .number-cart,
#header #site-header-center .group-icon-header ul li .number-like {
  color: #fff;
  position: absolute;
  background: var(--bgshop);
  width: 15px;
  height: 15px;
  font-size: 10px;
  line-height: 15px;
  border-radius: 50%;
  text-align: center;
  right: -8px;
  bottom: 12px;
}
a[data-tooltip="tooltip"]:hover:before {
  border: solid;
  border-color: transparent #be000000 #333 transparent;
  border-width: 6px 6px 6px 6px;
  content: "";
  left: calc(50% - 6px);
  bottom: -5px;
  position: absolute;
}
a[data-tooltip="tooltip"]:hover:after {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  background: #333;
  border-radius: 5px;
  color: #fff;
  content: attr(data-original-title);
  margin: 0;
  font-size: 13px;
  padding: 0;
  min-width: 80px;
  width: max-content;
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
  left: 50%;
  transform: translatex(-50%);
  position: absolute;
  top: auto;
  bottom: -35px;
}
</style>
