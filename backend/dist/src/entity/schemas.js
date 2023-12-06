"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderHistorySchema = exports.createOrderSchema = exports.signInSchema = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).required(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string().required().min(6),
});
exports.signInSchema = joi_1.default.object({
    email: joi_1.default.string().email(),
    password: joi_1.default.string().required().min(6),
});
exports.createOrderSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    bookId: joi_1.default.string().required(),
});
exports.getOrderHistorySchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    page: joi_1.default.number().required(),
    limit: joi_1.default.number().required(),
});
