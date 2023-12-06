import { Book } from "@/context/context";
import Link from "next/link";
import React from "react";

function BookCard({ data }: { data: Book }) {
  return (
   <Link href={`/book/${data.id}`}>
    <div  className="flex cursor-pointer flex-col px-3 py-4 justify-center items-center">
      <img src={data.coverImage} height={100} width={100} alt="image" />
      <p>{data.title}</p>
      <p>{data.writer}</p>
      <p>${data.price}</p>
    </div></Link>
  );
}

export default BookCard;
