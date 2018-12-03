const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let port = 7000;

app.get('/', (req, res) => {
    res.send('Ok');
});

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
})