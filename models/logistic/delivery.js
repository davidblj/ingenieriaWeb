let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Product = require('../seller/product');

let deliveryRecordschema = {
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  batch: [{
    deliveryId: {
      type: String,
      required: true
    },
    products: [Product.productschema],
    discount: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  }]
};

let schema = new mongoose.Schema(deliveryRecordschema);

module.exports = schema;
module.exports.deliveryRecordschema = deliveryRecordschema;
