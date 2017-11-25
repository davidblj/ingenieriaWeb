const listProductsTests = require('./shop/listProducts');
describe('Shop API', function() {

    describe('#GET /listProducts', function () {
      before('inicializacion de modelos', listProductsTests.beforeAllTests);
      it('Se debería retornar status 200', listProductsTests.responseStatus200);
    });

})
