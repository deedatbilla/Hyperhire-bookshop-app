import { getBooksService } from "../service/book.service";
import { Request, Response } from "express";
import {
  createUserService,
  getUserService,
  signInService,
} from "../service/user.service";
import { RequestWithUser } from "../middlewares/auth";

export const userController = {
  signUp: async (request: Request, response: Response) => {
    try {
      const user = await createUserService(request.body);
      response.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  },
  signIn: async (request: Request, response: Response) => {
    try {
      const user = await signInService(request.body);
      response.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  },
  getUser: async (request: RequestWithUser, response: Response) => {
    try {
      const user = await getUserService({ userId: request.user.id });
      response.status(200).json({
        status: 200,
        success: true,
        user,
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
