"use client";
import { useAppContext } from "@/context/context";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function AuthLayout({ children }) {
  const { user } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  return <div>{children}</div>;
}

export default AuthLayout;
