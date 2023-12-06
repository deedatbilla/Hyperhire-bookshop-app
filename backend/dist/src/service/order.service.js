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
exports.getUserOrderHistoryService = exports.getOrderService = exports.cancelOrderService = exports.createOrderService = void 0;
const schemas_1 = require("../entity/schemas");
const book_service_1 = require("./book.service");
const user_service_1 = require("./user.service");
const createOrderService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = schemas_1.createOrderSchema.validate(params);
        if (error) {
            throw new Error(error.message);
        }
        const { userId, bookId } = params;
        const user = yield (0, user_service_1.getUserService)({ userId });
        const book = yield (0, book_service_1.getBookService)({ bookId });
        if (user.credits < book.price) {
            throw new Error("You do not have enough credits to purchase this book");
        }
        const order = yield prisma.order.create({
            data: {
                status: "success",
                amount: book.price,
                userId,
                bookId,
            },
            include: {
                book: true,
            },
        });
        yield prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                credits: {
                    decrement: book.price,
                },
            },
        });
        return order;
    }
    catch (error) {
        throw error;
    }
});
exports.createOrderService = createOrderService;
const cancelOrderService = ({ orderId, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!orderId) {
            throw new Error("Order id is required");
        }
        const order = yield prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: "cancelled",
            },
        });
        return order;
    }
    catch (error) {
        throw error;
    }
});
exports.cancelOrderService = cancelOrderService;
const getOrderService = ({ orderId, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!orderId) {
            throw new Error("Order id is required");
        }
        const order = yield prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });
        return order;
    }
    catch (error) {
        throw error;
    }
});
exports.getOrderService = getOrderService;
const getUserOrderHistoryService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = schemas_1.getOrderHistorySchema.validate(params);
        if (error) {
            throw new Error(error.message);
        }
        const { page, limit, userId } = params;
        let order = yield prisma.order.findMany({
            skip: page,
            take: limit,
            where: {
                userId,
            },
            include: {
                book: true
            }
        });
        return order;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserOrderHistoryService = getUserOrderHistoryService;
