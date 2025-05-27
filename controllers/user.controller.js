const User = require("../models/User.model");
const logger = require("../utils/logger.util");

// TODO: not implemented.
const getProfile = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};

// TODO: not implemented.
const updatePassword = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};

module.exports = {
  getProfile,
  updatePassword,
};
