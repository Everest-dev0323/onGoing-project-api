const mongoose = require("mongoose");

const SubcategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    category: { type: String, required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subcategories", SubcategoriesSchema);
