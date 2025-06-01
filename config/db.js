import mongoose from "mongoose";
import logger from "../utils/logger.util.js";

const connectDB = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGODB_URI);
    logger.info(`MongoDB: Connected to server`);
  } catch (error) {
    logger.error(`MongoDB Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
