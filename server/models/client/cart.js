let mongoose = require('mongoose');
var Schema = mongoose.Schema;

let cartschema = {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    },
    product: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }]
}

let schema = new mongoose.Schema(cartschema);

module.exports = schema;
module.exports.productschema = cartschema;
