let express = require('express');

module.exports = function (wagner) {
  let api = express.Router();

  api.get('/getAccount', wagner.invoke(function (Account) {
    return function (req, res){

      let user_identification = req.query.identification;

      Account.findOne({identification:user_identification}, function (error, account){
        if(error){
          return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({
              error: error.toString()
            });
        }
        console.log(account);
        res.json(account);
      })
    }
  }));

  return api;
}
