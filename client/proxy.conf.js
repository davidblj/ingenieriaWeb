const PROXY_CONFIG = [
  {
    "context": [
      "/shop/listProducts",
      "/shop/addProduct",
      "/client/addToCart",
      "/user/login"
    ],
    "target": "http://localhost:3000",
    "secure": false
  }
];

module.exports = PROXY_CONFIG;

