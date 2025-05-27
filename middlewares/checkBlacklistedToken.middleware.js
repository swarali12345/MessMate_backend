const redis = require("../utils/redis.util.js");

const checkBlacklistedToken = async (req, res, next) => {
  const token = req.token; // Extracted by authMiddleware
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const isBlacklisted = await redis.get(`bl_${token}`);
  if (isBlacklisted) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }

  next();
};

module.exports = checkBlacklistedToken;
