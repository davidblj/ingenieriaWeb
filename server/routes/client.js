let express = require('express');
let status = require('http-status');

module.exports = function (wagner) {

  let api = express.Router();

  api.post('/addToCart', wagner.invoke(function(Cart) {
    return function(req, res) {
        let idClient = req.body.idClient;
        let idProduct = req.body.idProduct;
        Cart.findOne({client: idClient}).exec(function(err, cart) {
            if (cart) {
              Cart.findOneAndUpdate({client: idClient},{$push: {product: idProduct}}, function(error) {
                    if (error) {
                        return res
                            .status(status.INTERNAL_SERVER_ERROR)
                            .json({
                                error: error.toString()
                            });
                    }

                    let content = {
                        message: 'El producto se agregó correctamente'
                    };
                    res.json(content);
                });
            } else {
                let cart = {"client": idClient,"product": idProduct};
                Cart(cart).save(function(error) {
                        if (error) {
                            return res
                                .status(status.INTERNAL_SERVER_ERROR)
                                .json({error: error.toString()});
                        }
                        let content = { message: 'El carro se ha inicializado'};
                        res.json(content);
                });
            }
        })
     }
    }));

    // todo: use a middleware for authentication
    api.get('/listClients', wagner.invoke(function (User) {

        return function (req, res) {

            User.find({role: 'client'}).exec(function (error, clients) {

                if(error) {
                    return res
                        .status(status.INTERNAL_SERVER_ERROR)
                        .json({error: error.toString()});
                }

                return res.json(clients);
            })
        }
    }));

    api.get('/listCart', wagner.invoke(function(Cart,Product, Coupon){
      return function(req, res) {
        let idClient= req.query.idCliente;

        Cart.find({_id: idClient}).exec(function(err,cart) {
          console.log("lista los productos del carro");

        })
      }
    }));

  return api;
};
