let mongoose = require('mongoose');

let recordschema = {

  account_number: {
    type: String,
    required: true
  },
  tx:[{
    date: {
      type: Date,
      required: true
    },
    value:{
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    place:{
      type: String,
      required: true
    }
  }]
};

let schema = new mongoose.Schema(recordschema);

module.exports = schema;
module.exports.recordschema = recordschema;
