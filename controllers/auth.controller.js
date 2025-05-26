const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger.util");
const { sendResetPasswordEmail } = require("../utils/mailer.util");

const login = async (req, res) => {
  logger.debug("Received a request on /login.");
  const { email, password } = req.body;

  if (!email || !password) {
    logger.warn("Login failed: Missing email or password");
    res.status(400).json({ message: `Email and password are required.` });
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
    res.status(200).json({
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
    res.status(500).json({
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
    res.status(400).json({ message: `Name, email and password are required.` });
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
      profile_photo: profile_photo,
      name: name,
      email: email,
      password: hashedPassword,
      role: role || ["student"],
    });

    logger.info(
      `User registered: ${newUser.email} with role(s): ${newUser.role}`
    );

    const jwtToken = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
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
    logger.info(`Registration error: ${error}`);
    res.status(500).json({ message: "An error occured.", error: error });
  }
};

// TODO: Implementing
const forgot_password = async (req, res) => {
  logger.debug("Received a request on /forgot-password.");
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: `Email is required.` });
  }

  try {
    logger.info(`Requested Email: ${email}`);
    const user = await User.findOne({ email: email });
    if (!user) {
      logger.info(`No user with Email: ${email}`);
      res
        .status(404)
        .json({ message: `No account associated with mentioned e-mail ID.` });
    }

    logger.info(`Found Account: ${user.name}`);

    const token = user.generate_resetPasswordToken();
    await user.save();

    logger.info(`Token Generated: ${token}`);
    await sendResetPasswordEmail(user.email, token);

    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error });
  }
};

// TODO: Blacklisting JWT Tokens (Not necessary)
const logout = async (req, res) => {
  logger.debug("Received a request on /logout.");
  res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { login, register, logout, forgot_password };
