var express = require('express');
var router = express.Router();

var Purchase = require('.././models/Purchase');

// Find an producer by id
router.get('/', function (req, res) {
  Purchase.find({ _id: req.body._id }, function(err, purchase) {
    if (err) res.send(err);
    res.send(purchase);
  });
});

// Create new producer
router.put('/', function (req, res){
  var newPurchase = new Purchase({
    producer_id: req.body.producer_id,
    products: req.body.products
  });

  newPurchase.save(function(err, purchase) {
    if (err) res.send(err);
    res.send(purchase);
  });
});

// Update an producer
router.post('/', function (req, res){
  var updatedPurchase = {
    producer_id: req.body.producer_id,
    products: req.body.products
  };

  updatedPurchase.findByIdAndUpdate(req.body._id, updatedPurchase, function(err, purchase) {
    if (err) res.send(err);
    res.send(purchase);
  });
});

module.exports = router;