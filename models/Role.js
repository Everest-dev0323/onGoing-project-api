const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    type: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", RoleSchema);
