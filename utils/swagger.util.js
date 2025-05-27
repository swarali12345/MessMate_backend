const swaggerJsdoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.1.0",
  info: {
    title: "MessMate Internal API",
    version: "1.0.0",
    description: "API documentation for MessMate backend",
  },
  servers: [
    {
      url: process.env.BACKEND_URI, // Your API server URL
    },
  ],
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
