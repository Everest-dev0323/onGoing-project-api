const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
  {
    code: { type: String },
    name: { type: String },
    person: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    companyAddress: { type: String },
    bank: { type: String },
    account: { type: String },
    status: {type: String,
      enum : ['active','deactive'],
      default: 'active'},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", VendorSchema);
