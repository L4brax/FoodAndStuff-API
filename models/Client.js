const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var clientSchema = new Schema({
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
  active: Boolean
});

clientSchema.methods.comparePassword = function(pwd){
  if ('string' == typeof pwd && this.password == pwd) 
    return true;
  return false;
};

// On every save :
clientSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    this.created_at = currentDate;
    this.active = true;
  }

  next();
});

module.exports = mongoose.model('Client', clientSchema);