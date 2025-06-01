import express from "express";
const router = express.Router();

const {
  getProfile,
  updatePassword,
} = require("../controllers/user.controller.js");

/**
 * @route GET /auth/profile
 * @desc Get logged-in user's profile
 * @access Private
 * @returns {object} 200 - { id, name, email, role }
 * @returns {object} 401/500 - { message, error? }
 */
router.get("/profile", getProfile);

/**
 * @route POST /auth/update-password
 * @desc Updates password for authenticated user
 * @access Private
 * @body {string} currentPassword
 * @body {string} newPassword
 * @returns {object} 200 - { message }
 * @returns {object} 400/401/500 - { message, error? }
 */
router.post("/update-password", updatePassword);

export default router;
