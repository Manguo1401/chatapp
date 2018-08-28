require('./config');

const path = require('path');
const express = require('express');


let app = express();
const port = process.env.PORT;

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log('App listening on port: ', port);
});