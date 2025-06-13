import mongoose from "mongoose";
import logger from "../utils/logger.util.js";

export const connectDB = async () => {
  try {
    const URI =
      process.env.NODE_ENV === "LOCAL" || process.env.NODE_ENV === "development"
        ? process.env.LOCAL_MONGODB_URI
        : process.env.MONGODB_URI;

    await mongoose.connect(URI);
    logger.info(`MongoDB: Connected to server`);
  } catch (error) {
    logger.error(`MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};
