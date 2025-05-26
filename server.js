const dotenv = require("dotenv");
// Load environment variables
dotenv.config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./utils/logger.util.js");

const jsonwebtoken = require("jsonwebtoken");
const authRoutes = require("./routes/auth.routes.js");
const connectDB = require("./config/db.js");

const mailer = require("./utils/mailer.util");

connectDB();

// Initialize the app
const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

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
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRoutes);

app.use((req, res) => {
  res.status(404).send({ message: "Route not found." });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on: ` + "http://localhost:" + `${PORT}`);
});
