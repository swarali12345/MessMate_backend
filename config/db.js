const mongoose = require("mongoose");
const logger = require("../utils/logger.util");

const connectDB = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGODB_URI);
    logger.info(`MongoDB: Connected to server`);
  } catch (error) {
    logger.error(`MongoDB Error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
