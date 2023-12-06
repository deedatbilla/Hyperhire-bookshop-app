import { getBookService, getBooksService } from "../service/book.service";
import { Request, Response } from "express";
import { createOrderService } from "../service/order.service";
import { RequestWithUser } from "../middlewares/auth";

export const booksController = {
/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get a paginated list of books
 *     description: Retrieve a list of books with pagination support.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page.
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               books:
 *                 - title: "Book 1"
 *                   writer: "Author 1"
 *                  
 *                 - title: "Book 2"
 *                   writer: "Author 2"
 *                   
 *               nextPage: 2
 *               prevPage: null
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: 'Invalid parameters'
 */



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

  /**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a single book by ID
 *     description: Retrieve a book based on its unique identifier.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to retrieve.
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               title: "Book 1"
 *               writer: "Author 1"
 *              
 *       '404':
 *         description: Book not found
 *         content:
 *           application/json:
 *             example:
 *               error: 'Book not found'
 */
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

  /**
 * @openapi
 * /books/buy:
 *   post:
 *     summary: Buy a book
 *     description: Purchase a book by providing the book ID. Requires authorization.
 *     tags:
 *       - Books
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *             required:
 *               - bookId
 *     responses:
 *       '200':
 *         description: Successful purchase
 *         content:
 *           application/json:
 *             example:
 *               message: 'Book purchased successfully'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: 'Unauthorized'
 *       '404':
 *         description: Book not found
 *         content:
 *           application/json:
 *             example:
 *               error: 'Book not found'
 */
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
