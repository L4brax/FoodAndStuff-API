const express = require('express');
const bp = require('body-parser');
const mongoose   = require('mongoose');
mongoose.connect('mongodb://userFS:ynovnantes18@35.178.103.130:23992'); // connect to our database

var app = express();
const port = 23993;

// Using Body parser to parse the request.
// Request Data will be stored in req.body
app.use(bp.json());

// Retreiving routes
var ping = require('./routes/ping');
var clients = require('./routes/clients');
var deliverymen = require('./routes/deliverymen');
var orders = require('./routes/orders');
var purchases = require('./routes/purchases');

//Using routes
app.use('/ping', ping);
app.use('/clients', clients);
app.use('/deliverymen', deliverymen);
app.use('/orders', orders);
app.use('/purchases', purchases);

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
