let express = require('express');
const app = require('./app/app');
let path = require('path');

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', function(request, response){
    response.sendfile('./client/dist/index.html');
});

app.listen(app.get('port'), () => {
    console.log(`Servidor express escuchado en el puerto ${app.get('port')}`);
});
