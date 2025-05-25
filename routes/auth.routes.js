const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  forgot_password,
} = require("../controllers/auth.controller.js");

router.post("/login", login);
router.post("/forgot-password", forgot_password);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
