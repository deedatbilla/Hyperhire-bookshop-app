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
exports.booksController = void 0;
const book_service_1 = require("../service/book.service");
const order_service_1 = require("../service/order.service");
exports.booksController = {
    getBooks: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { page, limit } = request.query;
            const books = yield (0, book_service_1.getBooksService)({
                page: Number(page),
                limit: Number(limit),
            });
            response.status(200).json({
                status: 200,
                success: true,
                books,
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
    getBook: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const book = yield (0, book_service_1.getBookService)({
                bookId: id,
            });
            response.status(200).json({
                status: 200,
                success: true,
                book,
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
    buyBook: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id: userId } = request.user;
            const book = yield (0, order_service_1.createOrderService)({
                userId,
                bookId: request.body.bookId,
            });
            response.status(200).json({
                status: 200,
                success: true,
                book,
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
