"use client";
import { useAppContext } from "@/context/context";
import Link from "next/link";
import React from "react";

function Header() {
  const { user } = useAppContext();
  return (
    <div className="flex justify-end bg-green-200 px-4 py-3 w-full">
      {user ? (
        <div className="flex items-center space-x-3">
          <p>Welcome ,{user.name}</p>
          <Link href={"/orders"}>Buy history</Link>
          <p>Credits Left: {user?.credits || 0}</p>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <Link href={"/login"}>Login</Link>
          <Link href={"/signup"}>Sign up</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
