let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let accountschema = {
    identification: {
      type: String,
      required: true
    },
    account_number:{
      type: String,
      required: true
    },
    balance:{
      type: Number,
      required: true
    }
};

let schema = new mongoose.Schema(accountschema);

module.exports = schema;
module.exports.accountschema = accountschema;
