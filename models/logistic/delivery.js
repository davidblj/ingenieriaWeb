let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Product = require('../seller/product');

// r: rechazado, a: aceptado, e: espera
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
    vendorList: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    discount: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    },
    total: {
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
