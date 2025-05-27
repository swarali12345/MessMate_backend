const dotenv = require("dotenv");
// Load environment variables
dotenv.config();

// node_modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger.util.js");
const path = require("path");

// utils
const logger = require("./utils/logger.util.js");

// db
const connectDB = require("./config/db.js");

// routes
const authRoutes = require("./routes/auth.routes.js");
const menuRoutes = require("./routes/menu.routes.js");
// const orderRoutes = require("./routes/orders.routes.js");

// Initialize the app
const app = express();
const API_VERSION = process.env.API_VERSION;
const PORT = process.env.BACKEND_PORT || 3001;

connectDB();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:" + PORT,
      process.env.FRONTEND_URI,
      process.env.BACKEND_URI,
      "http://localhost:5041",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use(cors());
app.use(express.json());
app.use(
  API_VERSION + "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Morgan Logger
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// Catch application errors
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something went wrong.");
});

// Routes
app.use(API_VERSION + "/auth", authRoutes);
app.use(API_VERSION + "/menu", menuRoutes);
// app.use(API_VERSION + "/orders", orderRoutes);

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  // res.send("Backend has been deployed!");
});

// Error 404 Route
app.use((req, res) => {
  res.status(404).send({ message: "Route not found." });
});

module.exports = app;
