const { ObjectId } = require('bson');
const mongoose = require("mongoose");
const { Model, Schema } = mongoose;

const orderSchema = new Schema({
  orderId: {
    type: String, 
    unique: true,
    required: [true, 'Order requires a Unique ID']},
  item: String,
  quantity: Number,
  customerId: {
    type: String,
    ref: 'Customer'
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;