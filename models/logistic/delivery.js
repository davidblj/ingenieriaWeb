let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let deliveryschema = {
    identification: {
      type: String,
      required: true
    },
    account_number:{
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    balance:{
      type: Number,
      required: true,
    }
};

let schema = new mongoose.Schema(accountschema);

module.exports = schema;
module.exports.accountschema = accountschema;
