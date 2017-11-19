const PROXY_CONFIG = [
  {
    "context": [
      "/vendor/assignCoupon",
      "/vendor/getReports",
      "/shop/listProducts",
      "/shop/addProduct",
      "/shop/postImage",
      "/shop/listProductsByVendor",
      "/client/addToCart",
      "/client/listClients",
      "/client/listCart",
      "/client/buyProducts",
      "/user/login",
      "/bank/registerAccount",
      "/bank/accreditAccount",
      "/bank/getRecord"
    ],
    "target": "http://localhost:3000",
    "secure": false
  }
];

module.exports = PROXY_CONFIG;

