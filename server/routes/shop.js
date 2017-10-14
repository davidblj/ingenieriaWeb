let express = require('express');
let status = require('http-status');
let auth = require('../middleware/auth');

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
  
  api.get('/listProductsByVendor', wagner.invoke(function (Product) {

      // todo: this
      return function (req, res) {

          // Product.find({})
      }
  }));

  api.post('/addProduct', auth.verifyToken, wagner.invoke(function (Product) {

      return function (req, res) {

          let reqProduct = req.body.content;
          let userRole = req.decoded.role;
          let id_vendor = req.decoded._id;

          if (userRole !== 'vendor') {
              return res
                  .status(status.FORBIDDEN)
                  .json({error: 'No tienes la autorizacion para este tipo de peticion'});
          }

          reqProduct.id_vendor = id_vendor;
          console.log(reqProduct);

          Product(reqProduct).save(function (error) {
              if (error) {
                  return res
                      .status(status.INTERNAL_SERVER_ERROR)
                      .json({error: error.toString()});
              }

              let content = {message: 'El producto se ha creado'};
              res.json(content);
          })
      }
  }));

 //localhost:3000/shop/productDetails?id=1
  api.get('/productDetails', wagner.invoke(function(Product) {

      return function(req, res) {

        Product.find({_id: req.query.id}).exec( function(err, productDetail){
           if(err) {
             return res
               .status(status.INTERNAL_SERVER_ERROR)
              .json({error: err.toString()});
          }

          return res.json(productDetail);

        });
      }
    }));

    // api.get('/Products', wagner.invoke(function(Cart){
    //   return function(req, res) {
    //
    //
    //   }
    //
    // }));


  return api;
};
