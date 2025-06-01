import User from "../models/User.model.js";
import logger from "../utils/logger.util.js";

// TODO: not implemented.
const getProfile = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};

// TODO: not implemented.
const updatePassword = async (req, res) => {
  res.status(404).json({ message: "TODO: not implemented." });
};

export default {
  getProfile,
  updatePassword,
};
