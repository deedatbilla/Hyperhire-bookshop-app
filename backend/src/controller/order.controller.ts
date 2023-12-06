import { Request, Response } from "express";
import { createUserService, signInService } from "../service/user.service";
import {
  cancelOrderService,
  createOrderService,
  getOrderService,
  getUserOrderHistoryService,
} from "../service/order.service";
import { RequestWithUser } from "../middlewares/auth";

export const orderController = {
  createOrder: async (request: Request, response: Response) => {
    try {
      const order = await createOrderService(request.body);
      response.status(200).json({
        status: 200,
        success: true,
        order,
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
 * /orders/cancel-order:
 *   post:
 *     summary: Cancel an order
 *     description: Cancel a specific order by providing the order ID. Requires a Bearer token in the header for authorization.
 *     tags:
 *       - Orders
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *             required:
 *               - orderId
 *     responses:
 *       '200':
 *         description: Order canceled successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Order canceled successfully'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: 'Unauthorized'
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               error: 'Order not found'
 */
  cancelOrder: async (request: RequestWithUser, response: Response) => {
    try {
      const order = await cancelOrderService({
        orderId: request.body.orderId,
      });
      response.status(200).json({
        status: 200,
        success: true,
        order,
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  },
  getOrder: async (request: Request, response: Response) => {
    try {
      const order = await getOrderService(request.body);
      response.status(200).json({
        status: 200,
        success: true,
        order,
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
   * /orders:
   *   get:
   *     summary: Get user's order history
   *     description: Retrieve the order history of the current user. Requires a Bearer token in the header for authorization.
   *     tags:
   *       - Orders
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       '200':
   *         description: Successful response
   *         content:
   *           application/json:
   *             example:
   *               orders:
   *                 - orderId: '123456'
   *                   bookId: '789012'
   *                   amount: 2
   *
   *                   status: 'success'
   *                 # Additional orders as needed
   *       '401':
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             example:
   *               error: 'Unauthorized'
   */
  getOrderHistory: async (request: RequestWithUser, response: Response) => {
    try {
      const { id: userId } = request.user;
      const { page, limit } = request.query;
      const orders = await getUserOrderHistoryService({
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
    } catch (error) {
      response.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  },
};
