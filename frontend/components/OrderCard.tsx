import { Order } from "@/context/context";
import Link from "next/link";
import React from "react";
import Button from "./Button";

function OrderCard({
  data,
  handleCancelOrder,
}: {
  data: Order;
  handleCancelOrder: (id: string) => void;
}) {
  return (
    <div className="flex cursor-pointer flex-col px-3 py-4  items-start space-y-4">
      <p>Order ID - {data.id}</p>
      <p>Credit Used - {data.amount}</p>
      <p>
        Status -{" "}
        <span
          className={`${
            data.status === "success" ? "bg-green-700" : "bg-red-700"
          } text-white px-4 py-0.5 rounded-full`}
        >
          {data.status}
        </span>
      </p>
      <p>Book Bought - {data.book.title}</p>

      {data.status === "success" && (
        <Button
          onClick={() => handleCancelOrder(data.id)}
          type="button"
          text="Cancel Order"
        />
      )}
    </div>
  );
}

export default OrderCard;
