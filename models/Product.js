const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    category_id: { type: String, required: true },
    name: { type: String, required: true},
    th_name: { type: String},
    slug: { type: String, required: true, },
    description: { type: String},
    th_description: { type: String},
    main_ingredients: { type: String},
    th_main_ingredients: { type: String},
    nutritional_info: { type: String},
    th_nutritional_info: { type: String},
    product_type: { type: String, required: true },
    image : [{
        thumbnail : String,
        original : String
         }],
    gallery : [{
          thumbnail : String,
          original : String
           }],
    quantity: { type: String },
    price: { type: String },
    sale_price: { type: String },
    unit: { type: String },
    tag : [{
        name : String,
        th_name:  String,
        slug : String
         }],
    dates : [{
          date : String,
          meal_type : String,
          th_meal_type : String,
          status : String
           }],
    product_type: { type: String },
    max_price: { type: String },
    min_price: { type: String },
    variations : [{
      attribute_id : String,
      value : String,
      th_value : String,
      attribute : [{
        name : String,
        th_name: String,
        slug : String,
            values : [{
          attribute_id : String,
          value : String,
          th_value: String
              }],
         }],
       }],
    variation_options : [{
        title : String,
        th_title : String,
        price : String,
        sale_price : String,
        quantity : String,
        is_disabled : String,
        sku : String,
        nutritional_info: String,
        th_nutritional_info: String,
        main_ingredients: String,
        th_main_ingredients: String,
        image : [{
          thumbnail : String,
          original : String
           }],
        options : [{
          name : String,
          th_name: String,
          value : String,
          th_value: String
              }],
           }],
        allergens : [{
            allergen_id : String,
            status : String
             }],    
    status: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
