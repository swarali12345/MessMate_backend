import dotenv from "dotenv";
// Load environment variables
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.util.js";
import path from "path";
import { fileURLToPath } from "url";

import logger from "./utils/logger.util.js";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import menuRoutes from "./routes/menu.routes.js";
// import orderRoutes from "./routes/orders.routes.js";

// Initialize the app
const app = express();
const API_VERSION = process.env.API_VERSION;
const PORT = process.env.BACKEND_PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Routes
app.use(API_VERSION + "/auth", authRoutes);
app.use(API_VERSION + "/menu", menuRoutes);
// app.use(API_VERSION + "/orders", orderRoutes);

app.use(express.static(path.join(__dirname, "public")));
// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  // res.send("Backend has been deployed!");
});

// Error 404 Route
app.use((req, res) => {
  res.status(404).send({ message: "Route not found." });
});

// Centralized error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const isDev = ["development", "local"].includes(process.env.NODE_ENV);

  // Log full error details
  console.error("Unhandled error:", err);
  logger?.error?.(err.stack || err.message || err);

  // Respond with minimal detail in production
  res.status(statusCode).json({
    message: err.message || "Internal server error",
    status: statusCode,
    error: isDev ? err.stack || err.message : undefined,
  });
});

export default app;
