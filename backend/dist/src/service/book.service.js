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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookService = exports.getBooksService = void 0;
const db_module_1 = __importDefault(require("../repository/db.module"));
const getBooksService = ({ page, limit, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield db_module_1.default.book.findMany({
            skip: page,
            take: limit,
        });
        return books;
    }
    catch (error) {
        throw error;
    }
});
exports.getBooksService = getBooksService;
const getBookService = ({ bookId, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!bookId) {
            throw new Error("Book ID is required");
        }
        const book = yield db_module_1.default.book.findUnique({
            where: {
                id: bookId,
            },
        });
        if (!book) {
            throw new Error("Book not found");
        }
        return book;
    }
    catch (error) {
        throw error;
    }
});
exports.getBookService = getBookService;
