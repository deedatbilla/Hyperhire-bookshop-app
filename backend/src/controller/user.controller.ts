import { getBooksService } from "../service/book.service";
import { Request, Response } from "express";
import {
  createUserService,
  getUserService,
  signInService,
} from "../service/user.service";
import { RequestWithUser } from "../middlewares/auth";

export const userController = {
  /**
 * @openapi
 * /user/signup:
 *   post:
 *     summary: User signup
 *     description: Create a new user account by providing email, password, and name.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - name
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'User created successfully'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: 'Invalid request data'
 *       '409':
 *         description: Conflict
 *         content:
 *           application/json:
 *             example:
 *               error: 'User with this email already exists'
 */

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
  /**
 * @openapi
 * /user/signin:
 *   post:
 *     summary: User sign-in
 *     description: Sign in with an existing user account by providing email and password.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Sign in successful
 *         content:
 *           application/json:
 *             example:
 *               message: 'Sign in successful'
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               error: 'Invalid credentials'
 */
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
  /**
 * @openapi
 * /user:
 *   get:
 *     summary: Get user information
 *     description: Retrieve user information. Requires a Bearer token in the header for authorization.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               userId: '123456'
 *               email: 'user@example.com'
 *               name: 'John Doe'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: 'Unauthorized'
 */
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
