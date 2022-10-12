const mongoose = require("mongoose");

const ProductavailSchema = new mongoose.Schema(
  {
    product_id: { type: String },
    dates : [{
        date : String,
        status : String,
        type : String,
         }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Productavail", ProductavailSchema);
