const mongoose = require("mongoose");

const AllergensSchema = new mongoose.Schema(
  {
    name: { type: String },
    th_name: { type: String},
    image: { type: String},
    status: { type: String },
    slug: { type: String }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Allergens", AllergensSchema);
