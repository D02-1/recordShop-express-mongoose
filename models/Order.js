const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  quantity: {
    type: Number,
    required: true
  },
  record: {
    type: String,
    required: true
  }
},{ timestamps: true });

module.exports = mongoose.model("Order", orderSchema, "orders");