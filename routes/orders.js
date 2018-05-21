const express = require('express');
const router = express.Router();

const Order = require('.././models/Order');

// Fin n ordern by id
router.get('/:_id', function (req, res) {
  Order.findOne({ _id: req.params._id }, function(err, order) {
    if (err) res.send(err);
    res.send(order);
  });
});

// Create new order
router.put('/', function (req, res){
  var newOrder = new Order({
    deliveryman_id: req.body.deliveryman_id,
    products: req.body.products,
    status: req.body.password
  });

  newOrder.save(function(err, order) {
    if (err) res.send(err);
    res.send(order);
  });
});

// Update an order
router.post('/', function (req, res){
  var updatedOrder = {
    deliveryman_id: req.body.deliveryman_id,
    products: req.body.products,
    status: req.body.password
  };

  updatedOrder.findByIdAndUpdate(req.body._id, updatedOrder, function(err, order) {
    if (err) res.send(err);
    res.send(order);
  });
});

module.exports = router;