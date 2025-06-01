import mongoose from "mongoose";

const ItemVariantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  foodItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodItem",
    required: true,
  },
  price: {
    type: Number,
    required: true, // if every variant has additional price
    default: 0,
  },
});

ItemVariantSchema.index({ name: 1, foodItem: 1 }, { unique: true });

export default mongoose.model("ItemVariant", ItemVariantSchema);
