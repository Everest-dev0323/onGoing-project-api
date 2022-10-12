const mongoose = require("mongoose");

const OrderstatusSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    serial: { type: String, required: true, },
    color: { type: String},
    status: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orderstatus", OrderstatusSchema);
