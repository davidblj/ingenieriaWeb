let express = require('express');
let status = require('http-status');

module.exports = function (wagner) {
  let api = express.Router();

  api.get('/getAccount', wagner.invoke(function (Account) {
    return function (req, res){

      let user_identification = req.query.identification;
      console.log("id: ", user_identification);

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

  api.get('/getAccountNumber', wagner.invoke(function (Account) {
    return function (req, res){

      let user_identification = req.query.identification;

      Account.findOne({identification:user_identification}, 'account_number', function (error, account){
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

    api.get('/getAccountByNumber', wagner.invoke(function (Account) {
        return function (req, res) {

            let account_number = req.query.account_number;

            Account.findOne({account_number: account_number}, 'account_number', function (error, account) {
                if (error) {
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

  api.post('/registerAccount', wagner.invoke(function(Account){
      return function(req, res) {
          let reqAccount= req.body;
          Account(reqAccount).save(function(error, user) {
              if(error) {
                  return res
                      .status(status.INTERNAL_SERVER_ERROR)
                      .json({error: error.toString()});
              }
              console.log('Se registró exitosamente la cuenta');
              res.json(user);
          })

      }
  }));

  api.put('/debitAccount', wagner.invoke(function(Account,Record){
    return function(req, res){

      let reqDebitAccount = req.body;
      let account_number = req.body.account_number;

      let deliveryCost = reqDebitAccount.value*0.05;
      if(deliveryCost < 5000) deliveryCost = 5000;
      let valueToCharge = parseFloat(reqDebitAccount.value) + parseFloat(deliveryCost);

      console.log(account_number);

      Account.findOne({account_number:account_number}, function (error, account){
        if(error){
          return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({
              error: error.toString()
            });
        }

        if(!account) {
          return res
            .status(status.BAD_REQUEST)
            .json({
              error: "El número de cuenta no existe"
            });
        }

        if(reqDebitAccount.password !== account.password) {
          return res
            .status(status.FORBIDDEN)
            .json({
              error: "La contraseña o la cuenta es invalida"
            });
        }
        if(account.balance === 0){
          return res
            .status(status.CONFLICT)
            .json({error: "El usuario no tiene saldo"});
        }

        if(account.balance >= valueToCharge){
          account.balance -= valueToCharge;
          account.save();

          // todo: create in a function
          Record.findOne({account_number: account_number}, function(error, record){
            if(record) {

                let transaction = {
                  date: new Date(),
                  value: valueToCharge,
                  type: 'debit',
                  place: reqDebitAccount.place
                };

                record.tx.push(transaction);
                record.save();
                return res.json('La transaccion se agrego al historial');
            } else {

              let record_tx = {
                account_number: account_number,
                tx: [{
                  date: new Date(),
                  value: valueToCharge,
                  type: 'debit',
                  place: reqDebitAccount.place
                }]
              };

              Record(record_tx).save(function(error){
                if(error){
                  return res
                    .status(status.INTERNAL_SERVER_ERROR)
                    .json({
                      error: error.toString()
                    });
                }

                return res.json('La transaccion se agrego al historial');
              });
            }
          });

        } else {
          return res
            .status(status.BAD_REQUEST)
            .json({
              error: "Saldo insuficiente"
            });
        }
      })
    }
  }));

  // todo:use the auth middleware
  api.put('/accreditAccount', wagner.invoke(function(Account, Record){
    return function(req, res){

      let reqAccreditAccount = req.body;
      let account_number = req.body.account_number;
      console.log(account_number);

      Account.findOne({account_number:account_number}, function (error, account){

        if(error){
          return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({
              error: error.toString()
            });
        }

        if(!account){
            return res
                .status(status.BAD_REQUEST)
                .json({
                    error: "El numero de la cuenta ingresada no existe"
                });
        }

        console.log(account.balance);
        account.balance += parseFloat(reqAccreditAccount.value);
        console.log(account.balance);
        account.save();

        Record.findOne({account_number: account_number}, function(error, record){
          if(record) {

              let transaction = {
                date: new Date(),
                value: reqAccreditAccount.value,
                type: 'accredit',
                place: reqAccreditAccount.place
              };

              record.tx.push(transaction);
              record.save();
              console.log('La transaccion se agrego al historial');
              return res.json({transaction: transaction});
          }

          let record_tx = {
            account_number: account_number,
            tx: [{
              date: new Date(),
              value: reqAccreditAccount.value,
              type: 'accredit',
              place: reqAccreditAccount.place
            }]
          };

          Record(record_tx).save(function(error){
            if(error){
              return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json({
                  error: error.toString()
                });
            }

            let content = { message: 'La transaccion fue exitosa' };
            res.json(content);
          })
        })
      })
    }
  }));

  api.get('/getRecord',wagner.invoke(function(Account,Record){
    return function (req, res){
      let user_account = req.query.account;
      Record.findOne({account_number:user_account}, function (error, record){
        if(error){
          return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({
              error: error.toString()
            });
        }

        if(!record) {
            return res
                .json({message: 'No se encontraron resultados con el numero de la cuenta ingresada'});
        }

        console.log(record);
        res.json(record);
      })
    }
  }));

  return api;
};
