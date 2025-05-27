const Category = require("../models/Category.model");
const FoodItem = require("../models/FoodItem.model");
const ItemVariant = require("../models/ItemVariant.model");

const addCategory = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
const getAllCategories = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};
const updateCategory = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
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

module.exports = {
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
