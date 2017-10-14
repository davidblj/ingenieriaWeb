let express = require('express');
let status = require('http-status');
let mongoose= require('mongoose');


module.exports = function (wagner) {

  let api = express.Router();

  api.post('/assignCoupon',wagner.invoke(function(Coupon) {
      return function(req, res) {
            let clientsArray = req.body.clients;
            let idVendor = req.body.idVendor;

            Coupon.findOne({id_vendor: idVendor}).exec(function(err, coupon) {
                if (coupon) {
                    Coupon.findOneAndUpdate({id_vendor: idVendor},{ $push: { clients: {$each:clientsArray}}}, function(error) {
                          if (error) {
                              return res
                                  .status(status.INTERNAL_SERVER_ERROR)
                                  .json({
                                      error: error.toString()
                                  });
                          }
                          let content = {
                              message: 'Los cupones se agregaron correctamente'
                          };
                          res.json(content);

                      });

                } else {
                    let coupon = {"id_vendor": idVendor,"clients": clientsArray};
                    Coupon.create(coupon,function(error) {
                            if (error) {
                                return res
                                    .status(status.INTERNAL_SERVER_ERROR)
                                    .json({error: error.toString()}
                                  );
                            }
                            let content = { message: 'El cupón se agregó correctamente'};
                            res.json(content);
                    });
                }
            })
          }
  }));



return api;
}
