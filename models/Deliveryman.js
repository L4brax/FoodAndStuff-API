const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var deliverymanSchema = new Schema({
  email: {type: String, required: true, unique: true},
  address: String,
  first_name: String,
  last_name: String,
  created_at: Date,
  updated_at: Date,
  birthdate: String,
  phone_number: String,
  postal_code: String,
  password: String,
  disponibility: Boolean,
  active: Boolean
});

// On every save :
deliverymanSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('Deliveryman', deliverymanSchema);