const mongoose = require("mongoose");

const GrocerySchema = new mongoose.Schema(
    {
        sku: { type: String, required: true, unique: true },
        name: { type: String,  required: true},
        th_name: { type: String},
        category: { type: String, required: true},
        th_category: { type: String},
        subcategory: { type: String, required: true},
        th_subcategory: { type: String},
        size: { type: String },
        actualPrice: { type: Number },
        reducedPrice: {type: Number },
        bestSeller: { type: Boolean, default: 0},
        vendor: { type: String },
        th_vendor: { type: String },
        description: { type: String },
        th_description: { type: String },
        nutrition: { type: String },
        th_nutrition    : { type: String },
        ingredients: { type: String },
        th_ingredients: { type: String },
        shelf_life_start: { type: String },
        shelf_life_end: { type: String },
        customer_delivery_time_start: { type: String },
        customer_delivery_time_end: { type: String },
        vendor_delivery_time_start: { type: String },
        vendor_delivery_time_end: { type: String },
        image : [{
            thumbnail : String,
            original : String
             }],
        gallery : [{
              thumbnail : String,
              original : String
               }],
        tag : [{
            name : String,
            th_name:  String,
            slug : String
             }],
        status: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Grocery", GrocerySchema);