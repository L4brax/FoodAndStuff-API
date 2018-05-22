const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
  product_id: {type: Number, required: true},
  name: {type: String, required: true},
  categorie_id: {type: Number, required: true},
  price: {type: Number, required: true},
  description: String,
  photo_url: String,
  created_at: Date,
  updated_at: Date
});

// On every save :
productSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('Product', productSchema);