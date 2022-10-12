const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    //name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String },
    mobile2: { type: String },
    dob: { type: String },
    gender: { type: String },
    refer_code: { type: String },
    refered_by: { type: String },
    preferred_lang: { type: String },
    notif_email: { type: Boolean, default: true },
    notif_sms: { type: Boolean, default: true },
    role_id: { type: String, default: 1 },
    total_referrals: { type: String, default: 0 },
    total_orders: { type: String, default: 0 },
    wallet_balance: { type: String, default: 0 },
    zipcode: { type: String },
    allergens: [{
      name: { type: String, unique: true },
      image: String,
      slug: String,
      thai: String,
      updatedAt: String,
      status: String
    }],
    favourite: [{
      product_id: { type: String, unique: true },
      status: String
    }],
    user_wallet: [{
      transcation_type: String,
      credit_type: String,
      payment_mode: String,
      amount: String,
      status: String,
      remark: String
    }],
    //is admin will be replaced with role_id
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {type: String,
      enum : ['block','unblock'],
      default: 'unblock'},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
