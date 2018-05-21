const express = require('express');
const router = express.Router();

const Deliveryman = require('.././models/Deliveryman');

// Fin a deliveryman by id
router.get('/:email', function (req, res) {
  Deliveryman.findOne({ email: req.params.email }, function(err, deliveryMan) {
    if (err) res.send(err);
    if (deliveryMan.active){
      res.send(deliveryMan);
    } else {
      res.status(400).send('Ressource not found.');
    }
  });
});

// Create new deliveryman
router.put('/', function (req, res){
  var newDeliveryman = new Deliveryman({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    email: req.body.email 
  });

  newDeliveryman.save(function(err, deliveryMan) {
    if (err) res.send(err);
    res.send(deliveryMan);
  });
});

// Desactivate a deliveryman
router.delete('/', function (req, res){
  Deliveryman.findByIdAndUpdate(req.body._id, { active: false }, function(err, deliveryMan) {
    if (err) res.send(err);
    res.send(deliveryMan);
  });
});

// Update a deliveryman
router.post('/', function (req, res){
  var updatedDeliveryman = {
    address: req.body.address,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthdate: req.body.birthdate,
    phone_number: req.body.phone_number,
    postal_code: req.body.postal_code 
  };

  updatedDeliveryman.findByIdAndUpdate(req.body._id, updatedDeliveryman, function(err, deliveryMan) {
    if (err) res.send(err);
    res.send(deliveryMan);
  });
});

module.exports = router;