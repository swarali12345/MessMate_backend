const mongoose = require("mongoose");
const crypto = require("crypto");
const logger = require("../utils/logger.util");

const UserSchema = new mongoose.Schema(
  {
    profile_photo: {
      type: String,
      default: "NULL",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: [String],
      enum: [
        "admin",
        "mess_manager",
        "chef",
        "receptionist",
        "student",
        "test",
        "user",
      ],
      default: ["student"],
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: String },
  },
  { timestamps: true }
);

UserSchema.methods.generate_resetPasswordToken = function () {
  const validityOffset = 3600000; // 1 hour -> 3600 seconds -> 3600000 milliseconds
  logger.info("Generating a token");

  const token = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + validityOffset;

  logger.info("Generated a token");

  return token;
};

module.exports = mongoose.model("User", UserSchema);
