import { User } from "@prisma/client";
import { signInSchema, signupSchema } from "../entity/schemas";
import prisma from "../repository/db.module";
const jwt = require("jsonwebtoken");
import bcrypt from "bcryptjs";
export const createUserService = async (params: {
  email: string;
  password: string;
  name: string;
}): Promise<User> => {
  try {
    const { error } = signupSchema.validate(params);
    if (error) {
      throw new Error(error.message);
    }
    const { email, password, name } = params;
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      throw new Error("User already exists");
    }
    const encryptedPassword = await bcrypt.hash(password, 8);
    user = await prisma.user.create({
      data: {
        email,
        password: encryptedPassword,
        name,
        credits: 100,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
export const signInService = async (params: {
  email: string;
  password: string;
}): Promise<User> => {
  try {
    const { error } = signInSchema.validate(params);
    if (error) {
      throw new Error(error.message);
    }
    const { email, password } = params;

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Email or password incorrect");
    }

    const token = await jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_KEY,
      {
        expiresIn: "1d",
      }
    );
    user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: token,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserService = async (params: {
  userId: string;
}): Promise<User> => {
  try {
    if (!params.userId) {
      throw new Error("User ID is required");
    }
    let user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

