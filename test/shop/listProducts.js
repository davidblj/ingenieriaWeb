let shop = require('../mocks/shop');
let supertest = require('supertest'),
    app = require('../../app/app'),
    chai = require('chai'),
    wagner = require('wagner-core');

let expect = chai.expect;
let request = supertest(app);
let Product;
let jwt;

exports.beforeAllTests = function () {
  let models = require('../../models/models')(wagner);
  Product = models.Product;

}

exports.registerUser = function (done) {
    request
      .post(shop.registerUserURL)
      .set('Content-Type', 'application/json')
      .send(shop.user)
      .end(function (err) {
          expect(err).to.be.null;
          done();
      });
}

exports.login = function (done) {

      request
        .post(shop.loginURL)
        .set('Content-Type', 'application/json')
        .send(shop.user)
        .end(function (err, res) {
            expect(err).to.be.null;
            jwt= res.body.token;
            done();
       });
}

exports.addProduct = function (done) {

    shop.product.user["token"]= jwt;
    request
      .post(shop.addProductURL)
      .set('Content-Type', 'application/json')
      .send(shop.product)
      .end(function (err) {
          expect(err).to.be.null;
          done();
      })
}

exports.responseStatus200 = function(done) {

    request
        .get(shop.listProductsURL)
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(200);
            done();
        });
}

exports.jsonResponse = function (done) {

  request
      .get(shop.listProductsURL)
      .end(function (err, res) {
          expect(err).to.be.null;
          expect(res.statusCode).to.equal(200);
          expect(res).to.be.json;
          done();
      });
}

exports.responseDetails = function (done) {

    request
        .get(shop.listProductsURL)
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(200);
            expect(res).to.be.json;
            expect(res.body[0].name).to.equal('test');
            expect(res.body[0].description).to.equal('test');
            expect(res.body[0].vendorName).to.equal('test');
            expect(res.body[0].quantity).to.equal(1000);
            expect(res.body[0].price).to.equal(100);
            done();
        });
}
