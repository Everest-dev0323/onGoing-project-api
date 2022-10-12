const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    tracking_number: { type: String, required: true },
    userId: { type: String, required: true },
    customer : [{
      email : String,
      mobile : String
       }],
    total: { type: Number, required: true, default: 0 },
    shipping_fee: { type: Number, required: true, default: 0 },
    payment_gateway: { type: String, required: true },
    products : [{
      order_type: String,
      order_date: String,
      product_id: String,
      product_variant_id : String,
      name : String,
      quantity : Number, default:1,
      price : Number, default:0,
      status: String, default: 0,
      delivery_time: String,
      driver_id: String,
      user_address_id: String,
      lat:Number,
      lang:Number,
      delivery_status: String,
      delivery_photo: String,   
      note: String,
       }],
       status : [{
        order_status: String,
        th_order_status: String,
        remark: String,
        th_remark: String,
        timestamp : String,
        status: { type: String, default: "pending" },

         }],
    discount: { type: String, required: true, default: 0 },
    promocode: { type: String},
    order_total: {type: Number, default:0},
    total_after_discount: {type: Number, default:0},
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
