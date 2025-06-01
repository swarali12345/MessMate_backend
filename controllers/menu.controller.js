// DB interactions
import Category from "../models/Category.model.js";
import FoodItem from "../models/FoodItem.model.js";
import ItemVariant from "../models/ItemVariant.model.js";

// ----- Category API calls -----

export const addCategory = async (req, res) => {
  try {
    const { error, value } = categoryInsertSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, description } = value;

    const existing = await Category.findOne({ name: name.trim() }).lean();

    if (existing) {
      return res.status(409).json({ message: "Category already exists." });
    }

    const newCategory = await Category.insertOne({
      name: name.trim(),
      description,
    });

    return res.status(201).json({
      message: "Category added successfully.",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().lean();

    if (!categories.length) {
      return res
        .status(404)
        .json({ message: "No categories have been created." });
    }

    return res.status(200).json({ categories });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { error, value } = categoryUpdateSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { _id, name, description } = value;

    const category = await Category.findById(_id).lean();

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id },
      { name: name.trim(), description: description.trim() },
      { new: true, runValidators: true }
    ).lean();

    return res.status(200).json({
      message: "Category updated successfully.",
      category: updatedCategory,
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

export const deleteCategory = async (req, res) => {
  const { _id } = req.body;
  return res.status(404).json({ message: "TODO: not implemented." });
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
