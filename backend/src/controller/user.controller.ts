import { getBooksService } from "../service/book.service";
import { Request, Response } from "express";
import { createUserService, signInService } from "../service/user.service";

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
};
