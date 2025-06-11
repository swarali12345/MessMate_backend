const mongoose = require("mongoose");
const logger = require("../utils/logger.util");

const connectDB = async () => {
  try {
    const URI = process.env.ENVIRONMENT == "LOCAL" ? process.env.LOCAL_MONGODB_URI : process.env.MONGODB_URI;
    const connect = mongoose.connect(URI);
    logger.info(`MongoDB: Connected to server`);
  } catch (error) {
    logger.error(`MongoDB Error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
