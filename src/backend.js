//@flow
const serverScore = require('./serverScore');
const express = require('express');
const app = express();
const http = require('http');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
});

app.get('/api/:user', serverScore);

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
