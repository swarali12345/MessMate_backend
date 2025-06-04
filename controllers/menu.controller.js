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
    const { name, description, categoryId, price, variants } = req.body;

    if (!name || !categoryId || price == null) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Validate category exists
    const category = await Category.findById(categoryId).lean();
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Check duplicate food item in the same category (case-insensitive)
    const existing = await FoodItem.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
      category: categoryId,
    }).lean();

    if (existing) {
      return res
        .status(409)
        .json({ message: "Food item already exists in this category." });
    }

    // Create new food item
    const newFoodItem = await FoodItem.create({
      name: name.trim(),
      description,
      category: categoryId,
      price,
      variants: variants || [],
    });

    res.status(201).json({
      message: "Food item added successfully.",
      foodItem: newFoodItem,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Food Items (excluding soft-deleted)
export const getAllFoodItems = async (req, res, next) => {
  try {
    const foodItems = await FoodItem.find().populate("category").lean();

    if (!foodItems.length) {
      return res.status(404).json({ message: "No food items found." });
    }

    res.status(200).json({ foodItems });
  } catch (error) {
    next(error);
  }
};

// Get Food Item By ID
export const getFoodItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foodItem = await FoodItem.findById(id).populate("category").lean();

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found." });
    }

    res.status(200).json({ foodItem });
  } catch (error) {
    next(error);
  }
};

// Update Food Item
export const updateFoodItem = async (req, res, next) => {
  try {
    const { _id, name, description, categoryId, price, variants } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Food item ID is required." });
    }

    const foodItem = await FoodItem.findById(_id);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found." });
    }

    // Optional: Validate category exists if categoryId is provided
    if (categoryId) {
      const category = await Category.findById(categoryId).lean();
      if (!category) {
        return res.status(404).json({ message: "Category not found." });
      }
      foodItem.category = categoryId;
    }

    // Update fields if provided
    if (name) foodItem.name = name.trim();
    if (description) foodItem.description = description.trim();
    if (price != null) foodItem.price = price;
    if (variants) foodItem.variants = variants;

    const updated = await foodItem.save();

    res.status(200).json({
      message: "Food item updated successfully.",
      foodItem: updated,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Food Item (Soft delete)
export const deleteFoodItem = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const foodItem = await FoodItem.findById(_id);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found." });
    }

    await foodItem.delete(); // soft delete

    res.status(200).json({ message: "Food item deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// Restore Food Item
export const restoreFoodItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await FoodItem.findOneWithDeleted({ _id: id });
    if (!item) return res.status(404).json({ message: "Food item not found" });

    await item.restore();

    res.status(200).json({ message: "Food item restored successfully." });
  } catch (error) {
    next(error);
  }
};

// ----- Item Variant API calls -----

// Add Food Variant
export const addFoodVariant = async (req, res, next) => {
  try {
    const { foodItemId, name, additionalPrice } = req.body;

    if (!foodItemId || !name) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check for duplicate variant name per food item
    const existing = await ItemVariant.findOne({
      foodItem: foodItemId,
      name: { $regex: `^${name.trim()}$`, $options: "i" },
    }).lean();

    if (existing) {
      return res
        .status(409)
        .json({ message: "Variant already exists for this food item." });
    }

    const variant = await ItemVariant.create({
      foodItem: foodItemId,
      name: name.trim(),
      additionalPrice: additionalPrice || 0,
    });

    res.status(201).json({
      message: "Variant added successfully.",
      variant,
    });
  } catch (error) {
    next(error);
  }
};
// Get Item Variants by Food Item ID
export const getItemVariants = async (req, res, next) => {
  try {
    const { foodItemId } = req.params;
    if (!foodItemId) {
      return res.status(400).json({ message: "Food item ID required." });
    }

    const variants = await ItemVariant.find({ foodItem: foodItemId }).lean();

    if (!variants.length) {
      return res
        .status(404)
        .json({ message: "No variants found for this food item." });
    }

    res.status(200).json({ variants });
  } catch (error) {
    next(error);
  }
};

// Update Food Variant
export const updateFoodVariant = async (req, res, next) => {
  try {
    const { variantId, name, additionalPrice } = req.body;
    if (!variantId) {
      return res.status(400).json({ message: "Variant ID is required." });
    }

    const variant = await ItemVariant.findById(variantId);
    if (!variant) {
      return res.status(404).json({ message: "Variant not found." });
    }

    if (name) variant.name = name.trim();
    if (additionalPrice != null) variant.additionalPrice = additionalPrice;

    const updated = await variant.save();

    res.status(200).json({
      message: "Variant updated successfully.",
      variant: updated,
    });
  } catch (error) {
    next(error);
  }
};
// Delete Food Variant (soft delete)
export const deleteFoodVariant = async (req, res, next) => {
  try {
    const { variantId } = req.params;

    const variant = await ItemVariant.findById(variantId);
    if (!variant) {
      return res.status(404).json({ message: "Variant not found." });
    }

    await variant.delete();

    res.status(200).json({ message: "Variant deleted successfully." });
  } catch (error) {
    next(error);
  }
};
export const restoreFoodVariant = async (req, res, next) => {
  try {
    const { variantId } = req.params;
    const variant = await ItemVariant.findById(variantId).withDeleted(); // include deleted docs

    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    await variant.restore();

    res.status(200).json({ message: "Food variant restored successfully" });
  } catch (error) {
    next(error);
  }
};
