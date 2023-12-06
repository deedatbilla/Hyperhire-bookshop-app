import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
const app = express();

// Swagger configuration options

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book shop",
      version: "1.0.0",
      description: "API documentation for bookshop",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `https://hyperhire-bookshop-backend.fly.dev`,
      },
      {
        url: `http://localhost:5000`,
      },
      
    ],
  },
  apis: ["./**/*.ts"],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

export default app;
