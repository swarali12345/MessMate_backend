const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  generate_token,
  reset_password,
} = require("../controllers/auth.controller.js");

router.post("/login", login);
router.post("/forgot-password", generate_token);
router.post("/reset-password", reset_password);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
