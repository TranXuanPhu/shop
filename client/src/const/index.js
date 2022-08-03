export const accountContent = [
  {
    icon: "fa-solid fa-user fa-lg",
    title: "Thông tin",
    href: "/account",
  },
  {
    icon: "fa-solid fa-list-check fa-lg",
    title: "Danh sách đơn hàng",
    href: "/account/view",
    view: "order",
  },
  {
    icon: "fa-solid fa-location-dot fa-lg",
    title: "Địa chỉ",
    href: "/account/addresses",
  },
  {
    icon: "fa-solid fa-heart fa-lg",
    title: "Sản phẩm yêu thích",
    href: "/account/view",
    view: "wishlist",
  },
  {
    icon: "fa-solid fa-arrow-right-from-bracket fa-lg",
    title: "Đăng xuất",
    href: "/account/logout",
  },
];

export const ManagerContent = [
  {
    icon: "fa-solid fa-shirt fa-lg",
    title: "Tạo sản phẩm mới",
    href: "/products/new",
  },
  {
    icon: "fa-solid fa-list-ol fa-lg",
    title: "Quản lý sản phẩm",
    href: "/manager/products",
  },
  {
    icon: "fa-solid fa-truck fa-lg",
    title: "Quản lý đơn hàng",
    href: "/manager/orders",
  },
];
