let shop = require('../mocks/shop');
let supertest = require('supertest'),
    app = require('../../app/app'),
    chai = require('chai'),
    wagner = require('wagner-core');

let expect = chai.expect;
let request = supertest(app);
let Product;

exports.beforeAllTests = function () {
  let models = require('../../models/models')(wagner);
  Product = models.Product;
}

exports.responseStatus200 = function(done) {

    request
        .get(shop.listProductsURL)
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(200);
            done();
        })
};
