let express = require('express');
let status = require('http-status');

module.exports = function (wagner) {

  let api = express.Router();

  api.get('/listProducts', wagner.invoke(function (Product) {

    return function(req, res) {

      Product.find({}).exec( function(err, products){
        if(err) {
          return res
            .status(status.BAD_REQUEST)
            .json({error: err.toString()});
        }

        res.json(products);
      });
    }
  }));

  api.post('/addProduct', wagner.invoke(function (Product) {

    return function(req, res) {

      let reqProduct = req.body;
      console.log(reqProduct);

      // todo: check for an exisiting product in the database

      Product(reqProduct).save( function(error) {
        if(error) {
          return res
              .status(status.INTERNAL_SERVER_ERROR)
              .json({error: error.toString()});
        }

        let content = { message: 'El producto se ha creado'};
        res.json(content);
      })
    }
  }));

  return api;
}
