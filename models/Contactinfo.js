const mongoose = require("mongoose");

const ContactinfoSchema = new mongoose.Schema(
  {
    title: { type: String },
    th_title : { type: String },
    email: { type: String},
    address: { type: String},
    th_address: { type: String},
    contact: { type: String},
    mobile: { type: String},
    default: {type: Boolean},
    social_values : [{
        title : String,
        th_title : String,
        value : String
         }],

    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contactinfo", ContactinfoSchema);
