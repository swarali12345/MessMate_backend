import app from "./app.js";

const PORT = process.env.BACKEND_PORT || 3001;

// utils
import logger from "./utils/logger.util.js";

const localhost = `http://localhost:` + PORT;
const isDev = ["local", "development"].includes(process.env.NODE_ENV);

const backendLink = isDev ? localhost : `${process.env.BACKEND_URI}`;
const frontendLink = isDev ? localhost + PORT : `${process.env.FRONTEND_URI}`;
const API_VERSION = process.env.API_VERSION;

// Starting the server
app.listen(PORT, () => {
  const backendString = `Server running on: ` + backendLink;
  const swaggerString =
    `Swagger docs at: ` + backendLink + API_VERSION + `/api-docs`;

  logger.info(backendString);
  logger.info(swaggerString);
  logger.info(`============== SERVER STARTED ==============`);
});
