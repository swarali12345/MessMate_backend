const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on: ` + "http://localhost:" + `${PORT}`);
});
