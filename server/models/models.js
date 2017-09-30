let mongoose = require('mongoose');
let _ = require('underscore');
let config = require('../config/settings');

module.exports = function(wagner) {
  mongoose.connect(config.database);

  let Product = mongoose.model('Product', require('./seller/product'), 'products');

  let models = {
    Product: Product
  }

  _.each(models, function (value, key) {
        wagner.factory(key, function() {
            return value
        })
    });

    return models;
};
