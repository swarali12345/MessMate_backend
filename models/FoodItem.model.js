import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
// import { softDeletePlugin } from "./SoftDelete.plugin.js";

const FoodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food item name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must be under 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price can't be negative"],
      validate: {
        validator: (v) => v % 0.01 === 0, // ensure price up to 2 decimal places
        message: "Price must be a valid currency amount",
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description too long"],
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
      validate: {
        validator: (v) =>
          v === "" ||
          /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v),
        message: "Image URL must be a valid URL to an image",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true, // Prevent changes once created
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // auto-manage createdAt & updatedAt
  }
);

// Pre-save hook to update updatedAt on modification
FoodItemSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

FoodItemSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

// FoodItemSchema.plugin(softDeletePlugin);

export default mongoose.model("FoodItem", FoodItemSchema);
