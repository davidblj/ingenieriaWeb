let mongoose = require('mongoose');

let userschema = {

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
  },
  role: {
    type: String,
    required: true
  }
}

let schema = new mongoose.Schema(userschema);

module.exports = schema;
module.exports.userschema = userschema;
