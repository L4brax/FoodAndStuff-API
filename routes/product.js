var express = require('express');
var router = express.Router();

const Product = require('.././models/Product');

router.get('/', function(req, res){
  res.json({
    message : 'Route product',
    status : 'ok'
  });
});

// Find a product by id
router.get('/id/:product_id', function (req, res) {
  Product.findOne({ product_id: req.params.product_id }, function(err, product) {
    if (err) res.send(err);
    res.send(product);
  });
});

// Find each category
router.get('/category/list', function(req, res){
  Product.distinct('categorie').exec(function(err, categories){
    if (err) res.send(err);
    res.send(categories);
  });
});
// router.get('/category/list', function(req, res){
//   Product.distinct('categorie_id').exec(function(err, categories){
//     if (err) res.send(err);
//     let catReturnedPromised = categories.map(function(category) {
//       let productRet = {category:category};
//       return new Promise(function(resolve){
//         Product.findOne({categorie_id:category}, 'photo_url',function(err, product){
//           productRet.image_url = product.photo_url;
//           resolve(productRet);
//         });
//       });
//     });
//     Promise.all(catReturnedPromised).then(res.send);    
//   });
// });

//Find products by category
router.get('/category/:category', function(req, res){
  Product.find({categorie:req.params.category}).exec(function(err, products){
    if (err) res.send(err);
    res.send(products);
  });
});

// Find all product
router.get('/list', function(req, res) {
  Product.find({ }, function(err, product) {
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