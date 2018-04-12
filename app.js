var express = require('express');
const bp = require('body-parser');

var app = express();
const port = 23993;

// Using Body parser to parse the request.
// Request Data will be stored in req.body
app.use(bp.json());

// Retreiving routes
var ping = require('./routes/ping');

//Using routes
app.use('/ping', ping);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found, the url requested doesn\'t exist !');
  err.status = 404;
  next(err);
});

app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('FoodAndStuff\' server is running !');
});
