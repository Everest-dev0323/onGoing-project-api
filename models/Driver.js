const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
  {
    name: { type: String },
    th_name: { type: String},
    phone: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    lat: { type: String },
    lang: { type: String },
    status: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", DriverSchema);
