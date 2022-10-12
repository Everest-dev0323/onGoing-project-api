const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema(
  {
    cat_id: { type: String },
    title: { type: String},
    th_title: { type: String},
    image: { type: String},
    subtitle: { type: String},
    th_subtitle: { type: String},
    description: { type: String},
    th_description: { type: String},
    meta: { type: String},
    meta_schema: { type: String},
    slug: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", PageSchema);
