const mongoose = require("mongoose");

const Promotionschema = new mongoose.Schema(
  {
    promotion_category: { type: String},
    promotion_type: { type: String},
    custom_offers: { type: String},
    image: { type: String},
    promocode: { type: String},
    promo_description: { type: String},
    discount_percentage_value: { type: String},
    maximum_discount_amount: { type: String},
    minimum_order_value: { type: String},
    order_type: { type: String},
    recurring_weekly: { type: String},
    promotion_days: { type: String},
    promotion_validity: { type: String},
    maximum_uses: { type: String},
    maximum_uses_per_user: { type: String},
    status: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Promotion", Promotionschema);
