const mongoose = require("mongoose");

const ContactusSchema = new mongoose.Schema(
  {
    name: { type: String },
    mobile: { type: String},
    email: { type: String},
    company: { type: String},
    address: { type: String},
    message: { type: String},
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contactus", ContactusSchema);
