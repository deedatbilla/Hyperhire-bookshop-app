const jwt = require("jsonwebtoken");
import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
export interface RequestWithUser extends Request {
  user: User;
  token:string
}
const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const data = await jwt.verify(token, process.env.JWT_KEY);
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (data.exp * 1000 < Date.now()) {
      await prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          token: "",
        },
      });

      throw new Error();
    }

    const tokenValid = user.token === token;
    if (!user || !tokenValid) {
      return res
        .status(401)
        .send({ error: "Not authorized to access this resource" });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log(error.message)
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
export default auth;
