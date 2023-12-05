import { Book } from "@prisma/client";
import prisma from "../repository/db.module";

const getBooksService = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<Book[]> => {
  try {
    const books = await prisma.book.findMany({
      skip: page,
      take: limit,
    });
    return books;
  } catch (error) {
    throw error;
  }
};
const getBookService = async ({
  bookId,
}: {
  bookId: string;
}): Promise<Book> => {
  try {
    if (!bookId) {
      throw new Error("Book ID is required");
    }
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  } catch (error) {
    throw error;
  }
};


export { getBooksService, getBookService };
