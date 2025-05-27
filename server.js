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
const jsonwebtoken = require("jsonwebtoken");

// utils
const logger = require("./utils/logger.util.js");
const mailer = require("./utils/mailer.util");

// db
const connectDB = require("./config/db.js");

// routes
const authRoutes = require("./routes/auth.routes.js");
const menuRoutes = require("./routes/menu.routes.js");
// const orderRoutes = require("./routes/orders.routes.js");

// Initialize the app
const app = express();
const PORT = process.env.BACKEND_PORT || 3001;
let backendLink =
  process.env.ENVIRONMENT === "LOCAL"
    ? `http://localhost:`
    : `${process.env.BACKEND_URI}`;
const frontendLink =
  process.env.ENVIRONMENT === "LOCAL"
    ? `http://localhost:` + PORT
    : `${process.env.FRONTEND_URI}`;

const API_VERSION = process.env.API_VERSION;

connectDB();

// Middleware
app.use(helmet());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:" + PORT,
//       process.env.FRONTEND_URI,
//       process.env.BACKEND_URI,
//       "http://localhost:5041",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(cors());
app.use(express.json());
app.use(
  API_VERSION + "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

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
  res.sendFile(__dirname + "/index.html");
  res.send("Backend has been deployed!");
});

// Error 404 Route
app.use((req, res) => {
  res.status(404).send({ message: "Route not found." });
});

// Starting the server
app.listen(PORT, () => {
  if (process.env.ENVIRONMENT === "LOCAL") {
    backendLink += PORT;
  }
  const backendString = `Server running on: ` + backendLink;
  const swaggerString =
    `Swagger docs at: ` + backendLink + API_VERSION + `/api-docs`;

  logger.info(backendString);
  logger.info(swaggerString);
});
