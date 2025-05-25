const mongoose = require("mongoose");

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
      enum: ["admin", "mess_manager", "chef", "receptionist", "student"],
      default: ["student"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
