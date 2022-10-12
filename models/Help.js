const mongoose = require("mongoose");

const HelpSchema = new mongoose.Schema(
  {
    title_eng: { type: String },
    title_thai: { type: String},
    answer_eng: { type: String},
    answer_thai: { type: String},
    desc_eng: { type: String},
    desc_thai: { type: String},
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Help", HelpSchema);
