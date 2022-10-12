const mongoose = require("mongoose");

const ZipcodeSchema = new mongoose.Schema(
  {
    label: { type: String },
    th_label: { type: String},
    value: { type: String },
    delivery_status: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Zipcode", ZipcodeSchema);
