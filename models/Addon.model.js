import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
// import { softDeletePlugin } from "./SoftDelete.plugin.js";

const AddonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Addon name required"],
      trim: true,
      minlength: [1, "Variant name too short"],
      maxlength: [50, "Variant name too long"],
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
    isAvailable: {
      type: Boolean,
      default: true,
    },
        foodItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
      required: [true, "Associated FoodItem is required"],
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

AddonSchema.index({ name: 1, foodItem: 1 }, { unique: true });

AddonSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

AddonSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

// AddonSchema.plugin(softDeletePlugin);

export default mongoose.model("Addon", AddonSchema);
