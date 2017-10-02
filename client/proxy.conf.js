const PROXY_CONFIG = [
  {
    "context": [
      "/shop/listProducts"
    ],
    "target": "http://localhost:3000",
    "secure": false
  }
];

module.exports = PROXY_CONFIG;

