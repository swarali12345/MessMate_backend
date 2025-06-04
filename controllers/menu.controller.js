// DB interactions
import Category from "../models/Category.model.js";
import FoodItem from "../models/FoodItem.model.js";
import ItemVariant from "../models/ItemVariant.model.js";

// ----- Category API calls -----

export const addCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

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

export const getCurrentCategories = async (req, res, next) => {
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

export const getDeletedCategories = async (req, res, next) => {
  try {
    const categories = await Category.findDeleted().lean();

    if (!categories.length) {
      return res
        .status(404)
        .json({ message: "No categories have been soft-deleted recently." });
    }

    return res.status(200).json({ categories });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findWithDeleted().lean();

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

export const updateCategory = async (req, res, next) => {
  try {
    const { _id, name, description } = req.body;

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

export const deleteCategory = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const result = await Category.deleteById(_id);

    if (!result) {
      return res.status(404).json({ message: "Category not found." });
    }

    return res.status(200).json({
      message: `Deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

export const restoreCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    await category.restore();

    return res.status(200).json({ message: "Category restored." });
  } catch (error) {
    next(error);
  }
};

// ----- FoodItem API calls -----

export const addFoodItem = async (req, res, next) => {
  try {
    res.status(404).json({ message: "TODO: not implemented." });
  } catch (error) {
    next(error);
  }
};
export const getAllFoodItems = async (req, res, next) => {
  try {
    res.status(404).json({ message: "TODO: not implemented." });
  } catch (error) {
    next(error);
  }
};
export const getFoodItemById = async (req, res, next) => {
  try {
    res.status(404).json({ message: "TODO: not implemented." });
  } catch (error) {
    next(error);
  }
};
export const updateFoodItem = async (req, res, next) => {
  try {
    res.status(404).json({ message: "TODO: not implemented." });
  } catch (error) {
    next(error);
  }
};
export const deleteFoodItem = async (req, res, next) => {
  try {
    res.status(404).json({ message: "TODO: not implemented." });
  } catch (error) {
    next(error);
  }
};

export const restoreFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await FoodItem.findById(id).withDeleted();
    if (!item) return res.status(404).json({ message: "Food item not found" });
    await item.restore();
    res.json({ message: "Food item restored successfully" });
  } catch (error) {
    next(error);
  }
};

// ----- Item Variant API calls -----

export const addFoodVariant = async (req, res, next) => {
  try {
    res.status(404).json({ message: "TODO: not implemented." });
  } catch (error) {
    next(error);
  }
};
export const getItemVariants = async (req, res, next) => {
  try {
    res.status(404).json({ message: "TODO: not implemented." });
  } catch (error) {
    next(error);
  }
};
export const updateFoodVariant = async (req, res, next) => {
  try {
    res.status(404).json({ message: "TODO: not implemented." });
  } catch (error) {
    next(error);
  }
};
export const deleteFoodVariant = async (req, res, next) => {
  try {
    res.status(404).json({ message: "TODO: not implemented." });
  } catch (error) {
    next(error);
  }
};

export const restoreFoodVariant = async (req, res) => {
  try {
    const { variantId } = req.params;
    const variant = await FoodVariant.findById(variantId);
    if (!variant) return res.status(404).json({ message: "Variant not found" });
    await variant.restore();
    res.json({ message: "Food variant restored successfully" });
  } catch (error) {
    next(error);
  }
};
