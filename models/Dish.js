const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema(
    {
        name: { type: String,  required: true, unique: true},
        price: { type: Number, requred: true, unique: true},
        type: { type: String, required: true},
        category: { type: String, required: true},
        description: { type: String },
        nutrition: { type: String },
        ingredients: { type: String },
        allergens: { type: String },
        image: { type: String },
        reusable_packaging: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Dish", DishSchema);