import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
// import { softDeletePlugin } from "./SoftDelete.plugin.js";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      minlength: [3, "Category name too short"],
      maxlength: [50, "Category name too long"],
      lowercase: true, // normalize for uniqueness
    },
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: [255, "Description too long"],
    },
    isAvailable: {
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
    // deletedAt: {
    //   type: Date,
    //   default: null,
    // },
  },
  {
    timestamps: true,
  }
);

CategorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

CategorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

// CategorySchema.plugin(softDeletePlugin);

export default mongoose.model("Category", CategorySchema);
