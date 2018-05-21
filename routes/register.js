const express = require('express');
const router = express.Router();

const Client = require('.././models/Client');
const Deliveryman = require('.././models/Deliveryman');

router.post('/client', function(req, res){
  var newUser = new Client(req.body);
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send(err);
    } else {
      user.password = undefined;
      return res.json(user);
    }
  });
});

router.post('/deliveryMan', function(req, res){
  var newUser = new Deliveryman(req.body);
  newUser.save(function(err, deliveryman) {
    if (err) {
      return res.status(400).send(err);
    } else {
      deliveryman.password = undefined;
      return res.json(deliveryman);
    }
  });
});

module.exports = router;