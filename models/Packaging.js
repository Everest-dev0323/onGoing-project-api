const mongoose = require("mongoose");

const Packagingschema = new mongoose.Schema(
  {
    packaging_code: { type: String},
    packaging_name: { type: String},
    box_type: { type: String},
    image: { type: String},
    opening_balance: { type: String},
    closing_balance: { type: String},
    price: { type: String},
    status: { type: String},
    adjustment: { type: String},
    new_po: { type: String},
    status: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Packaging", Packagingschema);
