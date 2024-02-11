interface Link {
  icon: string;
  name: string;
  url: string;
}

export const Links: Link[] = [
  {
    icon: "fe-regular fa-house",
    name: "Home",
    url: "/",
  },
  {
    icon: "fe-regular fa-user",
    name: "Employee",
    url: "/employee",
  },
  {
    icon: "fe-regular fa-box-open",
    name: "Product",
    url: "/product",
  },
  {
    icon: "fe-regular fa-receipt",
    name: "Order",
    url: "/order",
  },
];
