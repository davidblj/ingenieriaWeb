const PROXY_CONFIG = [
  {
    "context": [
      "/vendor/assignCoupon",
      "/shop/listProducts",
      "/shop/addProduct",
      "/shop/listProductsByVendor",
      "/client/addToCart",
      "/client/listClients",
      "/user/login"
    ],
    "target": "http://localhost:3000",
    "secure": false
  }
];

module.exports = PROXY_CONFIG;

