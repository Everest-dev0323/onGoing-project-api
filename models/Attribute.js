const mongoose = require("mongoose");

const AttributeSchema = new mongoose.Schema(
  {
    name: { type: String },
    th_name: { type: String},
    slug: { type: String},
    values : [{
        value : String,
        th_value : String,
         }],
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attribute", AttributeSchema);
