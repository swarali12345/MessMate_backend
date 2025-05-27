const app = require("./app.js");
const PORT = process.env.BACKEND_PORT || 3001;
// utils
const logger = require("./utils/logger.util.js");

let backendLink =
  process.env.ENVIRONMENT === "LOCAL"
    ? `http://localhost:`
    : `${process.env.BACKEND_URI}`;
const frontendLink =
  process.env.ENVIRONMENT === "LOCAL"
    ? `http://localhost:` + PORT
    : `${process.env.FRONTEND_URI}`;
const API_VERSION = process.env.API_VERSION;

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
