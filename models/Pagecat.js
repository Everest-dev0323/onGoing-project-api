const mongoose = require("mongoose");

const PagecatSchema = new mongoose.Schema(
  {
    parent: { type: String },
    th_parent: { type: String},
    child: { type: String},
    th_child: { type: String},
    slug: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pagecat", PagecatSchema);
