let express = require('express');
let status = require('http-status');

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

  api.post('/registerAccount', wagner.invoke(function(Account){
      return function(req, res) {
          let reqAccount= req.body;
          Account(reqAccount).save(function(error) {
              if(error) {
                  return res
                      .status(status.INTERNAL_SERVER_ERROR)
                      .json({error: error.toString()});
              }
              let content = { message: 'Se registró exitosamente la cuenta'};
              res.json(content);
          })

      }
  }));

  api.put('/debitAccount', wagner.invoke(function(Account,Record){
    return function(req, res){

      let reqDebitAccount = req.body;
      let account_number = req.body.account_number
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

        if(account.balance >= reqDebitAccount.value){
          account.balance -= reqDebitAccount.value;
          account.save();

          // todo: create in a function
          Record.findOne({account_number: account_number}, function(error, record){
            if(record) {

                let transaction = {
                  date: new Date(),
                  value: reqDebitAccount.value,
                  type: 'debit',
                  place: reqDebitAccount.place
                }

                record.tx.push(transaction);
                record.save();
                return res.json('La transaccion se agrego al historial');
            }

            let record_tx = {
              account_number: account_number,
              tx: [{
                date: new Date(),
                value: reqDebitAccount.value,
                type: 'debit',
                place: reqDebitAccount.place
              }]
            }

            Record(record_tx).save(function(error){
              if(error){
                return res
                  .status(status.INTERNAL_SERVER_ERROR)
                  .json({
                    error: error.toString()
                  });
              }
            });
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

  api.put('/accreditAccount', wagner.invoke(function(Account, Record){
    return function(req, res){

      let reqAccreditAccount = req.body;
      let account_number = req.body.account_number
      console.log(account_number);

      Account.findOne({account_number:account_number}, function (error, account){
        if(error){
          return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({
              error: error.toString()
            });
        }

        account.balance += reqAccreditAccount.value;
        account.save();

        Record.findOne({account_number: account_number}, function(error, record){
          if(record) {

              let transaction = {
                date: new Date(),
                value: reqAccreditAccount.value,
                type: 'accredit',
                place: reqAccreditAccount.place
              }

              record.tx.push(transaction);
              record.save();
              return res.json('La transaccion se agrego al historial');
          }

          let record_tx = {
            account_number: account_number,
            tx: [{
              date: new Date(),
              value: reqAccreditAccount.value,
              type: 'accredit',
              place: reqAccreditAccount.place
            }]
          }

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
      Record.findOne({account_number:user_account}, function (error, account){
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
