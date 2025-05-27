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

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Menu management (Categories, Food Items, Variants)
 */

/**
 * @swagger
 * /menu/categories:
 *   get:
 *     summary: Get all food categories
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/categories", getAllCategories); // 🟢 Public

/**
 * @swagger
 * /menu/categories:
 *   post:
 *     summary: Add a new food category
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
router.post("/categories", authMiddleware, addCategory);

/**
 * @swagger
 * /menu/categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 */
router.put("/categories/:id", authMiddleware, updateCategory);

/**
 * @swagger
 * /menu/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 */
router.delete("/categories/:id", authMiddleware, deleteCategory);

// ----- Food Item Routes -----

/**
 * @swagger
 * /menu/items:
 *   get:
 *     summary: Get all food items
 *     tags: [Menu]
 *     parameters:
 *       - name: category
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of food items
 */
router.get("/items", getAllFoodItems); // optional query: ?category=catId

/**
 * @swagger
 * /menu/items/{id}:
 *   get:
 *     summary: Get a food item by ID
 *     tags: [Menu]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item data
 */
router.get("/items/:id", getFoodItemById);

/**
 * @swagger
 * /menu/items:
 *   post:
 *     summary: Add a new food item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Food item created
 */
router.post("/items", authMiddleware, addFoodItem);

/**
 * @swagger
 * /menu/items/{id}:
 *   put:
 *     summary: Update a food item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Food item updated
 */
router.put("/items/:id", authMiddleware, updateFoodItem);

/**
 * @swagger
 * /menu/items/{id}:
 *   delete:
 *     summary: Delete a food item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item deleted
 */
router.delete("/items/:id", authMiddleware, deleteFoodItem);

// ----- Variant Routes -----

/**
 * @swagger
 * /menu/items/{itemId}/variants:
 *   get:
 *     summary: Get variants of a food item
 *     tags: [Menu]
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of variants
 */
router.get("/items/:itemId/variants", getItemVariants);

/**
 * @swagger
 * /menu/items/{itemId}/variants:
 *   post:
 *     summary: Add a variant to a food item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Variant created
 */
router.post("/items/:itemId/variants", authMiddleware, addFoodVariant);

/**
 * @swagger
 * /menu/variants/{variantId}:
 *   put:
 *     summary: Update a food variant
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: variantId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Variant updated
 */
router.put("/variants/:variantId", authMiddleware, updateFoodVariant);

/**
 * @swagger
 * /menu/variants/{variantId}:
 *   delete:
 *     summary: Delete a food variant
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: variantId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Variant deleted
 */
router.delete("/variants/:variantId", authMiddleware, deleteFoodVariant);

module.exports = router;
