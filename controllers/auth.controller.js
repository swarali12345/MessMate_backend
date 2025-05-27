const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger.util");
const {
  sendResetPasswordEmail,
  sendResetPasswordAcknowledgementEmail,
} = require("../utils/mailer.util");

const login = async (req, res) => {
  logger.debug("Received a request on /login.");
  const { email, password } = req.body;

  if (!email || !password) {
    logger.warn("Login failed: Missing email or password");
    return res
      .status(400)
      .json({ message: `Email and password are required.` });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login failed: User not found for email ${email}`);
      return res.status(404).json({ message: `User not found.` });
    }

    // const isPasswordValid = password === user.password;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Login failed: Invalid password for user ${email}`);
      return res.status(401).json({ message: `Invalid e-mail or password.` });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    logger.info(`User ${user.email} logged in successfully`);
    return res.status(200).json({
      message: `Login successful.`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error(`Login error: ${error.stack}`);
    return res.status(500).json({
      message: `Server Error.`,
      error: `${error}`,
    });
  }
};

const register = async (req, res) => {
  logger.debug("Received a request on /register.");
  const { profile_photo, name, email, password, role } = req.body;

  if (!name || !email || !password) {
    logger.warn("Registration failed: Missing required fields.");
    return res
      .status(400)
      .json({ message: `Name, email and password are required.` });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const message = "User already exists with given credentials.";
      logger.warn(message);
      return res.status(400).json({ message: message });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      profile_photo: profile_photo || "NULL",
      name: name,
      email: email,
      password: hashedPassword,
      role: role || ["user"],
    });

    logger.info(
      `User registered: ${newUser.email} with role(s): ${newUser.role}`
    );

    const jwtToken = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "User registered successfully.",
      token: jwtToken,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    logger.error(`Registration error: ${error}`);
    return res.status(500).json({ message: "An error occured.", error: error });
  }
};

const generate_token = async (req, res) => {
  logger.debug("Received a request on /forgot-password.");
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: `Email is required.` });
  }

  try {
    logger.info(`Requested Email: ${email}`);
    const user = await User.findOne({ email: email });
    if (!user) {
      logger.info(`No user with Email: ${email}`);
      return res
        .status(404)
        .json({ message: `No account associated with mentioned e-mail ID.` });
    }

    logger.info(`Found Account: ${user.name}`);

    const token = user.generate_resetPasswordToken();
    await user.save();

    logger.info(`Token Generated: ${token}`);
    await sendResetPasswordEmail(user.email, token);

    return res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    logger.error("Error in /forgot-password: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error });
  }
};

const reset_password = async (req, res) => {
  logger.debug("Received a request on /reset-password.");
  const token = req.body.token || req.query.token || req.params.token;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Needs a token and a new Password." });
  }

  try {
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Cannot find user, Invalid or expired token." });
    }

    if (Date.now() > new Date(user.resetPasswordExpires).getTime()) {
      return res.status(401).json({ message: "Reset link has expired." });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res
        .status(400)
        .json({ message: "New password must be different from old password." });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    await sendResetPasswordAcknowledgementEmail(user.email);
    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    logger.error("Error in /reset-password: ", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error.", error: error });
  }
};

// TODO: Blacklisting JWT Tokens (Not necessary)
const logout = async (req, res) => {
  logger.debug("Received a request on /logout.");

  try {
    const authHeader = req.headers.authorizaiton;

    if (!authHeader) {
      return res.status(401).json({ message: "Ho authorization header sent." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token found in the header." });
    }

    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const now = Math.floor(Date.now() / 1000);
    const ttl = decoded.exp - now;
    if (ttl > 0) {
      await redis.set(`bl_${token}`, "1", "EX", ttl);
    }

    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error);
    logger.error("Error in /logout: ", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = {
  login,
  register,
  logout,
  generate_token,
  reset_password,
};
