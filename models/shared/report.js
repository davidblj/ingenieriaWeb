let mongoose = require('mongoose');
let Product = require('../seller/product');

let Schema = mongoose.Schema;

let reportschema = {
  id_vendor: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  batch: [{
    products: [Product.productschema],
    deliveryId: {
      type: String
    },
    discount: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    }
  }]
}

let schema = new mongoose.Schema(reportschema);

module.exports = schema;
module.exports.reportschema = reportschema;
