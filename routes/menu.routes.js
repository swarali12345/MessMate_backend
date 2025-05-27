const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const {
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
} = require("../controllers/menu.controller.js");

// ----- Category Routes -----

router.get("/categories", getAllCategories); // 🟢 Public
router.post("/categories", authMiddleware, addCategory);
router.put("/categories/:id", authMiddleware, updateCategory);
router.delete("/categories/:id", authMiddleware, deleteCategory);

// ----- Food Item Routes -----

router.get("/items", getAllFoodItems); // optional query: ?category=catId
router.get("/items/:id", getFoodItemById);
router.post("/items", authMiddleware, addFoodItem);
router.put("/items/:id", authMiddleware, updateFoodItem);
router.delete("/items/:id", authMiddleware, deleteFoodItem);

// ----- Variant Routes -----

router.get("/items/:itemId/variants", getItemVariants);
router.post("/items/:itemId/variants", authMiddleware, addFoodVariant);
router.put("/variants/:variantId", authMiddleware, updateFoodVariant);
router.delete("/variants/:variantId", authMiddleware, deleteFoodVariant);

module.exports = router;
