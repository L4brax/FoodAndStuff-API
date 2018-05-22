var express = require('express');
var router = express.Router();

const Product = require('.././models/Product');

var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// var userpwd = "userFS";
// var password = "ynovnantes18";
const dbName = 'foodandstuff';

// Connection URL
// const url = 'mongodb://35.178.103.130:23992';
const url2 = 'mongodb://userFS:ynovnantes18@35.178.103.130:23992/foodandstuff';

const findProduct = function(db, callback) {
  // Get the product collection
  const collection = db.collection('Product');
  // Find some products
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
};

router.get('/', function(req, res){
  res.json({
    message : 'Route product',
    status : 'ok'
  });
});

router.get('/list', function(req, res){
  // Use connect method to connect to the server
  MongoClient.connect(url2, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    findProduct(db, function(data) {
      res.json({
        message : data,
        status : 'ok'
      });
      client.close();
    });
  });

});


// Find a product by id
router.get('/:product_id', function (req, res) {
  Product.findOne({ product_id: req.params.product_id }, function(err, product) {
    if (err) res.send(err);
    res.send(product);
  });
});

// Create new Product
router.put('/', function (req, res){
  var newProduct = new Product({
    product_id: req.body.product_id,
    name: req.body.name,
    categorie_id: req.body.categorie_id,
    price: req.body.price,
    description: req.body.description,
    photo_url: req.body.photo_url
  });

  newProduct.save(function(err, product) {
    if (err) res.send(err);
    res.send(product);
  });
});

// Update an product
router.post('/', function (req, res){
  var updatedProduct = {
    product_id: req.body.product_id,
    name: req.body.name,
    categorie_id: req.body.categorie_id,
    price: req.body.price,
    description: req.body.description,
    photo_url: req.body.photo_url
  };

  updatedProduct.findByIdAndUpdate(req.body._id, updatedProduct, function(err, product) {
    if (err) res.send(err);
    res.send(product);
  });
});


module.exports = router;