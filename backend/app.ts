require("dotenv").config();

import express, { Express } from "express";
import { booksController } from "./src/controller/book.controller";
import { userController } from "./src/controller/user.controller";
import auth from "./src/middlewares/auth";
import { orderController } from "./src/controller/order.controller";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.get("/books", booksController.getBooks);
app.post("/user/signup", userController.signUp);
app.post("/user/sigin", userController.signIn);
app.post("/book/buy", auth, booksController.buyBook);
app.get("/book/:id", booksController.getBook);
app.get("/user/orders",auth, orderController.getOrderHistory);
app.post("/orders/cancel-order",auth, orderController.cancelOrder);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});