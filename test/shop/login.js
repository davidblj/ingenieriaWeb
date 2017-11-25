let shop = require('../mocks/shop');
let supertest = require('supertest'),
    app = require('../../app/app'),
    chai = require('chai'),
    wagner = require('wagner-core');

let expect = chai.expect;
let request = supertest(app);
let User;

exports.beforeAllTests = function (done) {
  let models = require('../../models/models')(wagner);
  User = models.User;

  request
    .post(shop.registerUserURL)
    .set('Content-Type', 'application/json')
    .send(shop.user)
    .end(function (err) {
        expect(err).to.be.null;
        done();
    });
}

exports.status401 = function (done) {

  request.post(shop.loginURL)
        .set('Content-Type', 'application/json')
        .send(shop.badUser)
        .end(function (err, res) {
            expect(res.statusCode).to.equal(401);
            done();
        });
}

exports.jsonResponse = function (done) {

  request.post(shop.loginURL)
        .set('Content-Type', 'application/json')
        .send(shop.user)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res.statusCode).to.equal(200);
          expect(res).to.be.json;
          done();
        });
}

exports.responseDetails = function (done) {

  User.findOne({identification:'123'},function(error,user){
    if(user){
      request.post(shop.loginURL)
          .set('Content-Type', 'application/json')
          .send(shop.user)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res.statusCode).to.equal(200);
            expect(res).to.be.json;
            expect(res.body.user).to.equal('test');
            expect(res.body.id).to.equal(user._id.toString());
            expect(res.body.role).to.equal('vendor');
            expect(res.body.token).to.not.be.empty;
          })
    }
    done();
  });
}

exports.afterAllTest = function () {

  after('Se eliminan los usuarios de la base de datos', function(done) {
    User.remove({}, function (err) {
        expect(err).to.be.null;
        done();
    });
  });
}
