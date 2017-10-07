let mongoose = require('mongoose');
let _ = require('underscore');
let config = require('../config/settings');

module.exports = function(wagner) {
  mongoose.connect(config.database);

  let Product = mongoose.model('Product', require('./seller/product'), 'products');
  let Client = mongoose.model('Client', require('./client/user'), 'clients');
  let Cart = mongoose.model('Cart', require('./client/cart'), 'carts');

  let models = {
    Product: Product,
    Client: Client,
    Cart: Cart
  }

  _.each(models, function (value, key) {
        wagner.factory(key, function() {
            return value
        })
    });

    return models;
};
