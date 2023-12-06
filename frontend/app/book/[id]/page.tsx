"use client";
import { AxiosHost } from "@/axiosGlobal";
import Button from "@/components/Button";
import { Book, useAppContext } from "@/context/context";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Book({ params: { id } }) {
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState(false);
  const { user, getUser } = useAppContext();
  async function getBook() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_BASE_URL}/book/${id}`
      );
      setBook(data.book);
    } catch (error) {}
  }
  useEffect(() => {
    if (id) {
      getBook();
    }
  }, [id]);
  const handleOrder = async () => {
    try {
      if (!user) {
        toast.error("Please login first");
        return;
      }
      setLoading(true);

      const { data } = await AxiosHost.post("/book/buy", { bookId: id });
      await getUser();
      setLoading(false);
      toast.success("You have successfully bought this book");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      toast.error(
        error?.response?.data?.message || "There was an error buying this book"
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col px-3 py-4 justify-center items-center">
        <img src={book?.coverImage} height={100} width={100} alt="image" />
        <p>{book?.title}</p>
        <p>{book?.writer}</p>
        <p>${book?.price}</p>
        <Button onClick={handleOrder} type="button" text="Order" />
      </div>
    </div>
  );
}

export default Book;
