var express = require('express');
var router = express.Router();

var Client = require('.././models/Client');

// Find a client by id
router.get('/', function (req, res) {
  Client.find({ email: req.body.email }, function(err, client) {
    if (err) res.send(err);
    res.send(client);
  });
});

// Create new Client
router.put('/', function (req, res){
  var newClient = new Client({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    email: req.body.email 
  });

  newClient.save(function(err, client) {
    if (err) res.send(err);
    res.send(client);
  });
});

// Desactivate a client
router.delete('/', function (req, res){
  Client.findByIdAndUpdate(req.body._id, { active: false }, function(err, client) {
    if (err) res.send(err);
    res.send(client);
  });
});

// Update a Client
router.post('/', function (req, res){
  var updatedClient = {
    address: req.body.address,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthdate: req.body.birthdate,
    phone_number: req.body.phone_number,
    postal_code: req.body.postal_code    
  };

  Client.findByIdAndUpdate(req.body._id, updatedClient, function(err, client) {
    if (err) res.send(err);
    res.send(client);
  });
});

module.exports = router;