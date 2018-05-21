const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.connect('mongodb://userFS:ynovnantes18@35.178.103.130:23992/foodandstuff'); // connect to our database

const app = express();
const port = 80;

// Using Body parser to parse the request.
// Request Data will be stored in req.body
app.use(bp.json());

// Retreiving routes
var ping = require('./routes/ping');
var clients = require('./routes/clients');
var deliverymen = require('./routes/deliverymen');
var orders = require('./routes/orders');
var purchases = require('./routes/purchases');
var login = require('./routes/login');
var register = require('./routes/register');

// Verifying JWT and initiate req.user for protected routes if token is verified.
app.use(function(req, res, next){
  if (req.headers && req.headers.authorization){
    jwt.verify(req.headers.authorization, 'superpwd', function(err, decode){
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

//Using routes
app.use('/ping', ping);
app.use('/clients', clients);
app.use('/deliverymen', deliverymen);
app.use('/orders', orders);
app.use('/purchases', purchases);
app.use('/login', login);
app.use('/register', register);

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
