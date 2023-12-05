import { getBookService, getBooksService } from "../service/book.service";
import { Request, Response } from "express";
import { createOrderService } from "../service/order.service";
import { RequestWithUser } from "../middlewares/auth";

export const booksController = {
  getBooks: async (request: Request, response: Response) => {
    try {
      const { page, limit } = request.query;
      const books = await getBooksService({
        page: Number(page),
        limit: Number(limit),
      });
      response.status(200).json({
        status: 200,
        success: true,
        books,
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  },
  getBook: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const book = await getBookService({
        bookId: id,
      });
      response.status(200).json({
        status: 200,
        success: true,
        book,
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  },

  buyBook: async (request: RequestWithUser, response: Response) => {
    try {
      const { id: userId } = request.user;
      const book = await createOrderService({
        userId,
        bookId: request.body.bookId,
      });
      response.status(200).json({
        status: 200,
        success: true,
        book,
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  },
};
