let chai = require('chai');
const registerUserTests = require('./shop/register');
const loginTests  = require('./shop/login');
const listProductsTests = require('./shop/listProducts');

chai.use(require('chai-http'));
chai.use(require('chai-jwt'));

describe('Shop API', function() {

    describe('#POST /registerUser', function () {

      before('inicializacion de modelos', registerUserTests.beforeAllTests);

      it('Debería retornar  estado 400 cuando no se ingresan todos los datos', registerUserTests.status400);
      it('Debería retornar como respuesta un  Content-Type application/json', registerUserTests.jsonResponse);
      it('Debería retornar un String', registerUserTests.stringResponse);
      it('Debería retornar una respuesta de éxito', registerUserTests.successfulRegistration);

      afterEach('Borrar todos los usuarios en la base de datos', registerUserTests.afterEachTest);
    });

    describe('#POST /login', function () {

      before('inicializacion de modelos', loginTests.beforeAllTests);

      it('Debería retornar  estado 401 cuando se ingresan los datos incorrectos', loginTests.status401);
      it('Debería retornar como respuesta un  Content-Type application/json', loginTests.jsonResponse);
      it('Debería retornar un Json así= {"username", "id", "role", "token"}', loginTests.responseDetails);

      after('Borrar todos los usuarios en la base de datos', loginTests.afterAllTest);
    });

    describe('#GET /listProducts', function () {
      before('inicializacion de modelos', listProductsTests.beforeAllTests);
      before('se inserta un vendedor', listProductsTests.registerUser);
      before('se loguea el  vendedor', listProductsTests.login);
      before('se agrega un producto', listProductsTests.addProduct);

      it('Se debería retornar status 200', listProductsTests.responseStatus200);
      it('Debería retornar como respuesta un  Content-Type application/json', listProductsTests.jsonResponse);
      it('Se deberian mostrar los detalles del producto', listProductsTests.responseDetails);
    });



})
