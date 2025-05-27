const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("FoodItem", FoodItemSchema);
