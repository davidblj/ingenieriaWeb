let express = require('express');
let status = require('http-status');
let auth = require('../middleware/auth');
let ObjectId = require('mongodb').ObjectId;

module.exports = function (wagner) {

  let api = express.Router();

  api.post('/addToCart', auth.verifyToken, wagner.invoke(function(Cart, Product) {
    return function(req, res) {

        let idClient = req.decoded._id;
        let idProduct = req.body.idProduct;

        // find a product by id
        Product.findById(idProduct, function (error, product) {

            if (error) {
                return res
                    .status(status.INTERNAL_SERVER_ERROR)
                    .json({
                        error: error.toString()
                    });
            }
            let productDetails = product;

            // get its vendor
            let productVendor = product.id_vendor;
            let vendorName = product.vendorName;

            //return the cart from an specific client
            Cart.findOne({client: idClient}).exec(function (error, cart) {

                if(cart) {
                    let vendorExist;

                    // todo: replace this loop with a sub-document search
                    cart.batch.filter(function (group) {

                        let currentVendorId = group.id_vendor;

                        // check if the product vendor is already in the cart (using an iteration over the array)
                        if(currentVendorId.equals(productVendor)){

                            vendorExist = true;
                            group.products.push(productDetails);
                            cart.save();

                            let content = {
                                message: 'El producto se agregó correctamente'
                            };
                            return res.json(content);
                        }
                    });

                    // handling the asynchronous call from "cart.save"
                    if(!vendorExist) {
                        let batch = {
                            id_vendor: productVendor,
                            vendorName: vendorName,
                            products: [productDetails]
                        };

                        cart.batch.push(batch);
                        cart.save();

                        let content = {
                            message: 'El producto se agrego a un lote diferente'
                        };
                        return res.json(content);
                    }

                } else {

                    // create a new object and save it to the cart schema
                    let cart = {
                        client: idClient,
                        batch: [{
                            id_vendor:  productVendor,
                            vendorName: vendorName,
                            products: [productDetails]
                        }]
                    };

                    Cart(cart).save(function (error) {

                        if(error){
                            return res
                                .status(status.INTERNAL_SERVER_ERROR)
                                .json({error: error.toString()});
                        }

                        let content = { message: 'El carro se ha inicializado' };
                        res.json(content);
                    })
                }
            })
        });
     }
    }));

    // Request headers:  name: x-access-token  value: xxx.xxx.xxx
    api.get('/listClients', auth.verifyToken, wagner.invoke(function (User) {

        return function (req, res) {

            let userRole = req.decoded.role;
            console.log(userRole);

            if(userRole !== 'vendor') {
                return res
                    .status(status.FORBIDDEN)
                    .json({error: 'No tienes la autorizacion para este tipo de peticion'});
            }

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

    api.get('/listCart', auth.verifyToken, wagner.invoke(function (Cart, Coupon) {

        return function (req, res) {

            let idClient = req.decoded._id;
            //let idClient = req.query.idClient;
            console.log(idClient);

            // todo(r2): persist this value for security purposes
            Cart.findOne({client: idClient}).lean().exec(function (err, cart) {

                if(!cart) {
                    return res.json({error: "el carro esta vacio"});
                }

                let batchLength = cart.batch.length;
                let counter = 0;

                // todo (r2): iterate through an array without "filter".
                // return each vendor in our batch entry
                cart.batch.filter(function (group, index) {

                    let vendor = group.id_vendor;

                    // todo (r2): query all documents to avoid operations on top of an asynchronous call
                    // find the existance of that vendor in the coupon's documents
                    Coupon.find({id_vendor: vendor, clients: idClient}).exec(function (error, coupon) {

                        // todo (r2): add a quantity value
                        // if the response is successful or not, set a new object with a hasCoupon field
                        if (coupon.length > 0) {
                            cart.batch[index].hasCoupon = true;
                        } else {
                            cart.batch[index].hasCoupon = false;
                        }

                        // handle the asynchronous call from Coupon.find()
                        counter++;
                        if(counter === (batchLength)) {
                            return res.json(cart);
                        }
                    });
                });
            });
        }
    }));

    // todo: use the authentication middleware
    api.post('/buyProducts', auth.verifyToken, wagner.invoke(function (Product, Cart, Report, Coupon, Delivery) {
      return function (req, res) {

        let productsByVendor = req.body.content;
        let idClient = req.decoded._id;

        let productList = [];
        let totalDiscount = 0;
        let totalSubtotals = 0;

        productsByVendor.forEach((vendorBatch) => {

          let idVendor = vendorBatch.id_vendor;
          let products = vendorBatch.products;
          let discount = 0;
          let subtotal = 0;

          // calcule el total
          vendorBatch.products.forEach((products) => {
            productList.push(products._id);
            subtotal += products.price;
          });

          totalSubtotals += subtotal;

          // remueva al cliente de la lista de cupones
          if(vendorBatch.hasCoupon) {
              discount = subtotal * 0.1;
              totalDiscount += discount;
              Coupon.findOne({id_vendor: idVendor}).exec(function(err, coupon){
                if(err){
                    return res
                        .status(status.INTERNAL_SERVER_ERROR)
                        .json({error: error.toString()});
                }
                if (coupon) {
                  console.log(coupon, "este es un cupon antes de");
                 let index = coupon.clients.indexOf(idClient);
                  if (index > -1) {
                    coupon.clients.splice(index, 1);
                    coupon.save();
                  }
                }
              });
          }

          // haga el reporte
          Report.findOne({id_vendor: idVendor}).exec(function(err, report) {
            if(err){
                return res
                    .status(status.INTERNAL_SERVER_ERROR)
                    .json({error: error.toString()});
            }

            if(report) {
              let batch = {
                    products: products,
                    discount: discount,
                    subtotal: subtotal
                };

              report.batch.push(batch);
              report.save();

              console.log('Se agrego un grupo de productos al vendedor')

              } else {
                  let report = {
                    id_vendor: idVendor,
                    batch: [{
                        products: products,
                        discount: discount,
                        subtotal: subtotal
                    }]
                  };
                Report(report).save(function(error){
                  if(error){
                      return res
                          .status(status.INTERNAL_SERVER_ERROR)
                          .json({error: error.toString()});
                  }
                  console.log('Se creo el reporte')
                });
            }
        });

      });

      // todo: inserte el documento con la lista de productos, el descuento
      // todo: calcular domicilio
      // todo: asociar cliente
      // todo: debite la cuenta
      // y la id del cliente

      // todo:

      // actualize el inventario
      // todo: validate an empty cart and products with no items in the inventory
      // todo: bug fix - repeated products in the productList are not updating more than once at a time
      Product.update({_id:  { $in: productList}}, {$inc: { soldQuantity: 1,  quantity: -1}}, {multi: true}, function (err) {

          if(err) {
              return res
                  .status(status.INTERNAL_SERVER_ERROR)
                  .json({error: err.toString()});
          }

          console.log(idClient);

          Cart.findOne({client: idClient}).remove(function (err) {

              console.log('Se elimino el carrito');

              if(err) {
                  return res
                      .status(status.INTERNAL_SERVER_ERROR)
                      .json({error: err.toString()});
              }


              let deliveryRequest = req.body.deliveryFlag;

                if(deliveryRequest) {

                  Delivery.findOne({client: idClient}).exec(function(err, delivery) {
                    if(err){
                        return res
                            .status(status.INTERNAL_SERVER_ERROR)
                            .json({error: error.toString()});
                    }

                    if(delivery) {
                      console.log("i do exist");
                    } else {

                      let date = new Date();
                      let components = [
                         date.getMonth(),
                         date.getDate(),
                         date.getHours(),
                         date.getMinutes(),
                         date.getSeconds(),
                         date.getMilliseconds()
                       ];
                      let id = components.join("");

                      // r: rechazado, a: aceptado, e: espera
                      let deliveryRecord = {
                        client: ObjectId(idClient),
                        batch: [{
                          deliveryId: id,
                          products: productList,
                          discount: totalDiscount,
                          subtotal: totalSubtotals,
                          state: 'e',
                        }]
                      }
                      console.log('delivery', deliveryRecord);

                      Delivery(deliveryRecord).save(function(error){
                        if(error){
                            return res
                                .status(status.INTERNAL_SERVER_ERROR)
                                .json({error: error.toString()});
                        }

                        console.log('Se creo el domicilio');
                        return res.json({message: "Los productos se han comprado satisfactoriamente"});
                      });
                    }
                  });
              }

              console.log("o no !");
          })
      });
    }
  }));

  // todo: quitar la cantidad de productos vendidos
  // todo: acredite la cuenta087701
  return api;
};
