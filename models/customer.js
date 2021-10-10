const { ObjectId } = require('bson');
const mongoose = require("mongoose");
const { Model, Schema } = mongoose;

const customerSchema = new Schema({
  customerId: {
    type: String, 
    unique: true,
    required: [true, 'Customer requires a unique ID']},
  firstName: String,
  lastName: String
});
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;