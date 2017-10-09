let mongoose = require('mongoose');

let productschema = {

  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required:true
  },
  quantity: {
    type: Number,
    required:true
  },
  price: {
    type: Number,
    required:true
  },
  image: {
    data: Buffer,
    contentType: String,
    required: false 
  },
  sku: {
    type: String
   /* required: true,
    unique: true*/
  }
}

let schema = new mongoose.Schema(productschema);

module.exports = schema;
module.exports.productschema = productschema;
