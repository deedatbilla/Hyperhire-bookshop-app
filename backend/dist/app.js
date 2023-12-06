"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./src/controller/book.controller");
const user_controller_1 = require("./src/controller/user.controller");
const auth_1 = __importDefault(require("./src/middlewares/auth"));
const order_controller_1 = require("./src/controller/order.controller");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.set("trust proxy", true);
app.get("/books", book_controller_1.booksController.getBooks);
app.post("/user/signup", user_controller_1.userController.signUp);
app.post("/user/sigin", user_controller_1.userController.signIn);
app.get("/user/:id", auth_1.default, user_controller_1.userController.getUser);
app.post("/book/buy", auth_1.default, book_controller_1.booksController.buyBook);
app.get("/book/:id", book_controller_1.booksController.getBook);
app.get("/orders", auth_1.default, order_controller_1.orderController.getOrderHistory);
app.post("/orders/cancel-order", auth_1.default, order_controller_1.orderController.cancelOrder);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
