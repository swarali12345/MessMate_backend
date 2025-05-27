const swaggerDefinition = {
  openapi: "3.0.0",
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
  // Path to the API docs (your routes files with swagger comments)
  apis: ["./routes/*.js"], // <-- adjust path if your route files are in a different folder
};

const swaggerSpec = swaggerJsdoc(options);
