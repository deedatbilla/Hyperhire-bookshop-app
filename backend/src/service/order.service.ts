import { Order } from "@prisma/client";
import { createOrderSchema } from "../entity/schemas";
import { getBookService } from "./book.service";
import { getUserService } from "./user.service";

export const createOrderService = async (params: {
  bookId: string;
  userId: string;
}): Promise<Order> => {
  try {
    const { error } = createOrderSchema.validate(params);
    if (error) {
      throw new Error(error.message);
    }
    const { userId, bookId } = params;
    const user = await getUserService({ userId });
    const book = await getBookService({ bookId });
    if (user.credits < book.price) {
      throw new Error("You do not have enough credits to purchase this book");
    }
    const order = await prisma.order.create({
      data: {
        status: "success",
        amount: book.price,
        userId,
        bookId,
      },
      include: {
        book: true,
      },
    });
    return order;
  } catch (error) {
    throw error;
  }
};
export const cancelOrderService = async ({
  orderId,
}: {
  orderId: string;
}): Promise<Order> => {
  try {
    if (!orderId) {
      throw new Error("Order id is required");
    }
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "cancelled",
      },
    });
    return order;
  } catch (error) {
    throw error;
  }
};
export const getOrderService = async ({
  orderId,
}: {
  orderId: string;
}): Promise<Order> => {
  try {
    if (!orderId) {
      throw new Error("Order id is required");
    }
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    return order;
  } catch (error) {
    throw error;
  }
};

export const getUserOrderHistoryService = async (params: {
  userId: string;
}): Promise<Order[]> => {
  try {
    if (!params.userId) {
      throw new Error("User ID is required");
    }
    let order = await prisma.order.findMany({
      where: {
        id: params.userId,
      },
    });

    return order;
  } catch (error) {
    throw error;
  }
};
