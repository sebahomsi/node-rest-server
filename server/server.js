require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();



const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//requiere y usa la ruta de usuaio
app.use(require('./routes/usuario'));

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;

    console.log('DB online');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto', process.env.PORT);
});