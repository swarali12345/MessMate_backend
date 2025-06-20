import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

// Joi Validations
import { validateBody, validateParams } from "../middlewares/joi.middleware.js";
import {
  categoryInsertSchema,
  categoryUpdateSchema,
  categoryDeleteSchema,
} from "../validators/menu.validator.js";

const router = express.Router();

import {
  addCategory,
  getAllCategories,
  getDeletedCategories,
  getCurrentCategories,
  updateCategory,
  deleteCategory,
  restoreCategory,
  addFoodItem,
  getAllFoodItems,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem,
  restoreFoodItem,
  addAddon,
  getAddons,
  updateAddon,
  deleteAddon,
  restoreAddon,
} from "../controllers/menu.controller.js";

// ----- Category Routes -----

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Menu management (Categories, Food Items, addons)
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
router.get("/categories", getCurrentCategories); // 🟢 Public

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
 *               description:
 *                 type: string
 *               isAvailable:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
router.post(
  "/categories",
  authMiddleware,
  validateBody(categoryInsertSchema),
  addCategory
);

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
router.put(
  "/categories/:_id",
  authMiddleware,
  validateBody(categoryUpdateSchema),
  updateCategory
);

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
router.delete(
  "/categories/:_id",
  authMiddleware,
  validateParams(categoryDeleteSchema),
  deleteCategory
);

/**
 * @swagger
 * /menu/categories/{id}/restore:
 *   patch:
 *     summary: Restore a soft-deleted category
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
 *         description: Category restored successfully
 *       404:
 *         description: Category not found
 */
router.patch("/categories/:id/restore", authMiddleware, restoreCategory);

router.get("/categories/deleted", authMiddleware, getDeletedCategories);
router.get("/categories/all", authMiddleware, getAllCategories);

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

/**
 * @swagger
 * /menu/items/{id}/restore:
 *   patch:
 *     summary: Restore a soft-deleted food item
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
 *         description: Food item restored successfully
 *       404:
 *         description: Food item not found
 */
router.patch("/items/:id/restore", authMiddleware, restoreFoodItem);

// ----- addon Routes -----

/**
 * @swagger
 * /menu/items/{itemId}/addons:
 *   get:
 *     summary: Get addons of a food item
 *     tags: [Menu]
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of addons
 */
router.get("/items/:itemId/addons", getAddons);

/**
 * @swagger
 * /menu/items/{itemId}/addons:
 *   post:
 *     summary: Add an addon to a food item
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
 *         description: addon created
 */
router.post("/items/:itemId/addons", authMiddleware, addAddon);

/**
 * @swagger
 * /menu/addons/{addonId}:
 *   put:
 *     summary: Update a food addon
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: addonId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: addon updated
 */
router.put("/addons/:addonId", authMiddleware, updateAddon);

/**
 * @swagger
 * /menu/addons/{addonId}:
 *   delete:
 *     summary: Delete a food addon
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: addonId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: addon deleted
 */
router.delete("/addons/:addonId", authMiddleware, deleteAddon);

/**
 * @swagger
 * /menu/addons/{addonId}/restore:
 *   patch:
 *     summary: Restore a soft-deleted food addon
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: addonId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: addon restored
 */
router.patch(
  "/addons/:addonId/restore",
  authMiddleware,
  restoreAddon
);

export default router;
