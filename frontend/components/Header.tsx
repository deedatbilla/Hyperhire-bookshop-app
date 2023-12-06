"use client";
import { useAppContext } from "@/context/context";
import Link from "next/link";
import React from "react";

function Header() {
  const { user } = useAppContext();
  return (
    <div className="flex justify-end bg-green-800 px-4 py-3 w-full">
      
      {user ? (
        <div className="flex items-center space-x-3">
          <p className="font-bold text-white">Welcome ,{user.name}</p>
          <Link  href={"/"}> <p className="text-white">Home</p></Link>
          <Link href={"/orders"}> <p className="text-white">Buy history</p></Link>
          <p className="text-white">Credits Left: {user?.credits || 0}</p>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <Link href={"/login"}>  <p className="text-white">Login</p></Link>
          <Link href={"/signup"}> <p className="text-white">Sign up</p></Link>
        </div>
      )}
    </div>
  );
}

export default Header;
