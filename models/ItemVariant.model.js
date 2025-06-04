import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
// import { softDeletePlugin } from "./SoftDelete.plugin.js";

const ItemVariantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Variant name required"],
      trim: true,
      minlength: [1, "Variant name too short"],
      maxlength: [50, "Variant name too long"],
    },
    foodItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
      required: [true, "Associated FoodItem is required"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
      default: 0,
      validate: {
        validator: (v) => v % 0.01 === 0,
        message: "Price must be a valid currency amount",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

ItemVariantSchema.index({ name: 1, foodItem: 1 }, { unique: true });

ItemVariantSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

ItemVariantSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

// ItemVariantSchema.plugin(softDeletePlugin);

export default mongoose.model("ItemVariant", ItemVariantSchema);
