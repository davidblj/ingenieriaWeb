let express = require('express');
let path = require('path');

let app = express();
require('../config/config')(app);
require('../endpoints/routes')(app);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', function(request, response){
    response.sendfile('./client/dist/index.html');
});

module.exports = app;
