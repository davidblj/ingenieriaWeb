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
      "/client/getRecord",
      "/client/getDelivery",
      "/client/processDelivery",
      "/user/login",
      "/user/registerUser",
      "/bank/registerAccount",
      "/bank/accreditAccount",
      "/bank/getAccountByNumber",
      "/bank/getRecord"
    ],
    "target": "http://localhost:3000",
    "secure": false
  }
];

module.exports = PROXY_CONFIG;
