"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("../service/order.service");
exports.orderController = {
    createOrder: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield (0, order_service_1.createOrderService)(request.body);
            response.status(200).json({
                status: 200,
                success: true,
                order,
            });
        }
        catch (error) {
            response.status(500).json({
                status: 500,
                success: false,
                message: error.message,
            });
        }
    }),
    cancelOrder: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield (0, order_service_1.cancelOrderService)({
                orderId: request.body.orderId,
            });
            response.status(200).json({
                status: 200,
                success: true,
                order,
            });
        }
        catch (error) {
            response.status(500).json({
                status: 500,
                success: false,
                message: error.message,
            });
        }
    }),
    getOrder: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield (0, order_service_1.getOrderService)(request.body);
            response.status(200).json({
                status: 200,
                success: true,
                order,
            });
        }
        catch (error) {
            response.status(500).json({
                status: 500,
                success: false,
                message: error.message,
            });
        }
    }),
    getOrderHistory: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id: userId } = request.user;
            const { page, limit } = request.query;
            console.log(request.query, "here");
            const orders = yield (0, order_service_1.getUserOrderHistoryService)({
                userId,
                page: Number(page),
                limit: Number(limit),
            });
            console.log(orders);
            response.status(200).json({
                status: 200,
                success: true,
                orders,
            });
        }
        catch (error) {
            response.status(500).json({
                status: 500,
                success: false,
                message: error.message,
            });
        }
    }),
};
