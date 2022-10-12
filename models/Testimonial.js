const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String },
    name_thai: { type: String },
    image: { type: String},
    short_desc: { type: String},
    short_desc_thai: { type: String},
    description: { type: String},
    description_thai: { type: String},
    date: { type: String},
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", TestimonialSchema);
