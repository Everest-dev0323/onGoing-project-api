const mongoose = require("mongoose");

const OrderpaymentSchema = new mongoose.Schema(
  {
    Transcation_id: { type: String },
    order_id: { type: String, required: true, unique: true },
    customer_id: { type: String, required: true },
    payment_type: { type: String, required: true },
    payment_status: { type: String, required: true },
    amount: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orderpayment", OrderpaymentSchema);
