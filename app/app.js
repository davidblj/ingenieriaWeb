let express = require('express');
let path = require('path');
let cors = require('cors');

let app = express();
require('../config/config')(app);
require('../endpoints/routes')(app);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(cors({origin: '*'}));

app.use(function (req, res, next) {
});

app.get('*', function(request, response){
    response.sendfile('./client/dist/index.html');
});

module.exports = app;
