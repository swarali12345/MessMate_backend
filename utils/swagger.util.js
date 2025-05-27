const swaggerJsdoc = require("swagger-jsdoc");

const serverList =
  process.env.ENVIRONMENT === "LOCAL"
    ? [
        {
          url:
            "http://localhost:" +
            process.env.BACKEND_PORT +
            process.env.API_VERSION,
        },
        {
          url: process.env.BACKEND_URI + process.env.API_VERSION,
        },
      ]
    : [
        {
          url: process.env.BACKEND_URI + process.env.API_VERSION,
        },
      ];

const swaggerDefinition = {
  openapi: "3.1.0",
  info: {
    title: "MessMate Internal API",
    version: "1.0.0",
    description: "API documentation for MessMate backend",
  },
  servers: serverList,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  // Path to the API route docs
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
