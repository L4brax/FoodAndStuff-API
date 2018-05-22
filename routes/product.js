var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// var userpwd = "userFS";
// var password = "ynovnantes18";
const dbName = 'foodandstuff';

// Connection URL
// const url = 'mongodb://35.178.103.130:23992';
const url2 = 'mongodb://userFS:ynovnantes18@35.178.103.130:23992/foodandstuff'

const findProduct = function(db, callback) {
  // Get the product collection
  const collection = db.collection('Product');
  // Find some products
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

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

module.exports = router;