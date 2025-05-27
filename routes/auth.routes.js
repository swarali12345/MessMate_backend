const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
// const checkBlacklistedToken = require("../middlewares/checkBlacklistedToken.middleware");
const router = express.Router();

const {
  login,
  register,
  logout,
  generate_token,
  reset_password,
} = require("../controllers/auth.controller.js");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & Authorization
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Sends reset password email with token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Email not found
 *       500:
 *         description: Server error
 */
router.post("/forgot-password", generate_token);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Resets password using token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized or token expired
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post("/reset-password", reset_password);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/register", register);

// 🔐 Protect all routes below
router.use(authMiddleware);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logs out user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", logout);

module.exports = router;
