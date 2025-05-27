const dotenv = require("dotenv");
// Load environment variables
dotenv.config();

// node_modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger.util.js"); // or wherever you defined it
const jsonwebtoken = require("jsonwebtoken");

// utils
const logger = require("./utils/logger.util.js");
const mailer = require("./utils/mailer.util");

// db
const connectDB = require("./config/db.js");

// routes
const authRoutes = require("./routes/auth.routes.js");
const authRoutes = require("./routes/orders.routes.js");

// Initialize the app
const app = express();
const PORT = process.env.BACKEND_PORT || 3001;
const backendLink = `${process.env.BACKEND_URI}`;
const frontendLink = `${process.env.FRONTEND_URI}`;
const apiVersion = "/api/v1";

connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiVersion + "/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use(apiVersion + "/auth", authRoutes);
app.use(apiVersion + "/orders", orderRoutes);

// Home Route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  res.send("Backend has been deployed!");
});

// Error 404 Route
app.use((req, res) => {
  res.status(404).send({ message: "Route not found." });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on: ` + backendLink + `${PORT}`);
  console.log(`Swagger docs at: ` + frontendLink + ``);
});
