const express = require('express');
const router = express.Router();

const Client = require('.././models/Client');
const Deliveryman = require('.././models/Deliveryman');
const jwt = require('jsonwebtoken');


router.post('/client', function(req, res) {
  Client.findOne({ email: req.body.email }, function(err, client) {
    if (err) res.status(400).send(err);
    if (!client) {
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } else if (client) {
      if (!client.comparePassword(req.body.password)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({token: jwt.sign({ email: client.email, first_name: client.first_name, _id: client._id}, 'superpwd')});
      }
    }
  });
});

router.post('/deliveryman', function(req, res) {
  Deliveryman.findOne({ email: req.body.email }, function(err, deliveryman) {
    if (err) res.status(400).send(err);
    if (!deliveryman) {
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } else if (deliveryman) {
      if (!deliveryman.comparePassword(req.body.password)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({token: jwt.sign({ email: deliveryman.email, first_name: deliveryman.first_name, _id: deliveryman._id}, 'superpwd')});
      }
    }
  });
});

module.exports = router;