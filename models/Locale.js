const mongoose = require("mongoose");

const LocaleSchema = new mongoose.Schema(
  {
    title: { type: String },
    value: { type: String},
    th_title: { type: String},
    th_value: { type: String},
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Locale", LocaleSchema);
