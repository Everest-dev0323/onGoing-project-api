const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    th_name: { type: String},
    slug: { type: String, required: true, },
    image : [{
        thumbnail : String,
        original : String
         }],
    icon: { type: String },
    children : [{
        name : String,
        th_name: String,
        slug : String
         }],
    status: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", CategoriesSchema);
