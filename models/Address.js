const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    user_id: { type: String },
    title: { type: String},
    type: { type: String},
    address : [{
        lat : Number,
        lng : Number,
        formatted_address : String,
        building_name : String,
        building_number : String,
        street_name : String,
        street_number : String,
        mobile_number : String,
        backup_mobile_number : String,
        instruction : String,
        pin_code : String,
        area : String,
        image: String,
         }],
    remark: { type: String },
    default: { type: Boolean, default: true },
    status: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Address", AddressSchema);
