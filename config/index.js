'use strict';

// todo: add a production configuration
let env = process.env.NODE_ENV;
let config = require(`./${env}`);

module.exports = config;
