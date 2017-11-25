const shopURL = '/shop/';
const userURL = '/user/';

let registerUserURL = userURL + 'registerUser';
let loginURL = userURL + 'login';
let listProductsURL = shopURL+'listProducts';
let addProductURL = shopURL + 'addProduct';

exports.registerUserURL = registerUserURL;
exports.loginURL = loginURL;
exports.listProductsURL = listProductsURL;
exports.addProductURL = addProductURL;

exports.user = {
  "identification": "123",
  "username": "test",
  "password": "test",
  "role": "vendor"
  }
exports.badUser = {
    "username": "test1",
    "password": "test1",
  }

exports.product = {
    content: {
      "name": "test",
      "description": "test",
      "price": "100",
      "quantity": "1000"
    },
    user: {
      "user": "test",
      "role": "vendor",
    }
}
