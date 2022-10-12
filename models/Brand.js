const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: { type: String },
    th_name: { type: String},
    image:  { type: String },
    slug: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);
