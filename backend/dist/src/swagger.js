"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const app = (0, express_1.default)();
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
                url: `http://localhost:5000/api/v1/`,
            },
        ],
    },
    apis: ["./controller/**/*.ts"],
};
// Initialize swagger-jsdoc
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Serve Swagger UI
app.use("/", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, { explorer: true }));
exports.default = app;
