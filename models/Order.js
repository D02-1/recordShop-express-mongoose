const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  quantity: {
    type: Number,
    required: true
  },
  record: [
    {
      ref: "Record",
      type: mongoose.Schema.Types.ObjectId
    }
  ]
},{ timestamps: true });

module.exports = mongoose.model("Order", orderSchema, "orders");