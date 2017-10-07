let mongoose = require('mongoose');

let clientschema = {

  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  }
}

let schema = new mongoose.Schema(clientschema);

module.exports = schema;
module.exports.productschema = clientschema;
