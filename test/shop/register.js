let shop = require('../mocks/shop');
let supertest = require('supertest'),
    app = require('../../app/app'),
    chai = require('chai'),
    wagner = require('wagner-core');

let expect = chai.expect;
let request = supertest(app);
let User;

exports.beforeAllTests = function () {
  let models = require('../../models/models')(wagner);
  User = models.User;
}

exports.status400 = function (done) {

  request.post(shop.registerUserURL)
        .set('Content-Type', 'application/json')
        .send({
          "identification": "123",
          "username": "123",
          "password": "123"
        })
        .end(function (err, res) {
            expect(res.statusCode).to.equal(400);
            done();
        });
}

exports.jsonResponse = function(done) {

    request.post(shop.registerUserURL)
          .set('Content-Type', 'application/json')
          .send(shop.user)
          .end(function (err, res) {
              expect(res).to.be.json;
              done();
          });
}

exports.stringResponse = function (done) {

  request.post(shop.registerUserURL)
        .set('Content-Type', 'application/json')
        .send(shop.user)
        .end(function (err, res) {
            expect(res).to.be.json;
            expect(res.body.message).to.be.a('string');
            done();
        });
}

exports.successfulRegistration = function (done) {

  request.post(shop.registerUserURL)
        .set('Content-Type', 'application/json')
        .send(shop.user)
        .end(function (err, res) {
            expect(res).to.be.json;
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.be.equal('Se registró exitosamente el cliente');
            done();
        });
}

exports.afterEachTest = function (done) {

  User.remove({}, function (err) {
      expect(err).to.be.null;
      done()
  });

}
