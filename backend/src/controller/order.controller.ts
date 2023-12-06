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
  getOrderHistory: async (request: RequestWithUser, response: Response) => {
    try {
      const { id: userId } = request.user;
      const { page, limit } = request.query;
      console.log(request.query,"here")
      const orders = await getUserOrderHistoryService({
        userId,
        page: Number(page),
        limit: Number(limit),
      });
      console.log(orders)
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
