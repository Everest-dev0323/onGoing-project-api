const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        meal_type: { type: String },
        date: { type: String },
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 , required: true},
        price: { type: Number, default: 0 , required: true},
      },
    ],
    status:{ type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
