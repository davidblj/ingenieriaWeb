const bodyParser = require('body-parser');

module.exports = function (app) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended : true}));
  app.set('port',  process.env.PORT || 3000);
}
