const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const {
  addCategory,
  deleteCategory,
  addFoodItem,
  deleteFoodItem,
  addFoodVariant,
  deleteFoodVariant,
} = require("../controllers/menu.controller.js");

router.post("/add-category", authMiddleware, addCategory);

router.post("/delete-category", authMiddleware, deleteCategory);

router.post("/add-foodItem", authMiddleware, addFoodItem);

router.post("/delete-foodItem", authMiddleware, deleteFoodItem);

router.post("/add-itemVariant", authMiddleware, addFoodVariant);

router.post("/delete-itemVariant", authMiddleware, deleteFoodVariant);

module.exports = router;
