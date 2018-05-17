const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var purchaseSchema = new Schema({
  producer_id: {type: String, required: true},
  products: [{product_id: String, number: Number, price: Number}],
  created_at: Date,
  updated_at: Date
});

// On every save :
purchaseSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('Purchase', purchaseSchema);