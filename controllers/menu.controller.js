// DB interactions
import Category from "../models/Category.model.js";
import FoodItem from "../models/FoodItem.model.js";
import ItemVariant from "../models/ItemVariant.model.js";

// Joi Validations
import {
  categoryInsertSchema,
  categoryUpdateSchema,
  categoryDeleteSchema,
} from "../validators/menu.validator.js";

// ----- Category API calls -----

export const addCategory = async (req, res) => {
  try {
    const { name, description } = categoryInsertSchema.validate(req.body);

    const existing = await Category.findOne({ name: name.trim() }).lean();

    if (existing) {
      return res.status(409).json({ message: "Category already exists." });
    }

    const newCategory = await Category.insertOne({
      name: name.trim(),
      description,
    });

    return res.status(200).json({
      message: "Category added successfully.",
      category: newCategory,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();

    if (!categories.length) {
      const error = new Error("No categories have been created.");
      error.status = 404;
      throw error;
    }

    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { _id, name, description } = categoryUpdateSchema.validate(req.body);

    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "Category name is required and must be a string." });
    }

    const oldCategory = await Category.findOne({ name: name.trim() }).lean();

    if (!oldCategory) {
      return res.status(404).json({ message: "Category does not exist." });
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { name: name.trim() },
      { description },
      { new: true, runValidators: true }
    ).lean();

    return res.status(200).json({
      message: "Category updated successfully.",
      category: updatedCategory,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (req, res) => {
  const { _id } = res.status(404).json({ message: "TODO: not implemented." });
};

// ----- FoodItem API calls -----

export const addFoodItem = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
export const getAllFoodItems = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
export const getFoodItemById = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
export const updateFoodItem = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
export const deleteFoodItem = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};

// ----- Item Variant API calls -----

export const addFoodVariant = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
export const getItemVariants = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
export const updateFoodVariant = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
export const deleteFoodVariant = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
