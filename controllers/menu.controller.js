// node_modules
import Joi from "joi";

// DB interactions
import Category from "../models/Category.model.js";
import FoodItem from "../models/FoodItem.model.js";
import ItemVariant from "../models/ItemVariant.model.js";

// ----- Category API calls -----

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "Category name is required and must be a string." });
    }

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

const getAllCategories = async (req, res) => {
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

const updateCategory = async (req, res) => {
  try {
    const { _id, name, description } = req.body;

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
      category: newCategory,
    });
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};

// ----- FoodItem API calls -----

const addFoodItem = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
const getAllFoodItems = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
const getFoodItemById = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
const updateFoodItem = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
const deleteFoodItem = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};

// ----- Item Variant API calls -----

const addFoodVariant = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
const getItemVariants = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
const updateFoodVariant = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
const deleteFoodVariant = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};

export default {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  addFoodItem,
  getAllFoodItems,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem,
  addFoodVariant,
  getItemVariants,
  updateFoodVariant,
  deleteFoodVariant,
};
