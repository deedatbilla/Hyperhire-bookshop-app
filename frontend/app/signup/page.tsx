"use client";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Signup() {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const onChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_BASE_URL}/user/signup`,
        values
      );
      setLoading(false);
      toast.success("Account created successfully. please login");
      router.push("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrongF");
    }
  };
  return (
    <div className="flex flex-col mx-auto max-w-sm mt-10 px-4">
      <h1>Signup</h1>
      <form onSubmit={onSubmit} className="flex flex-col space-y-5">
        <div>
          <input
            type="text"
            name="name"
            onChange={onChange}
            className="px-2 py-2 rounded-lg border w-full"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            onChange={onChange}
            className="px-2 py-2 rounded-lg border w-full"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            onChange={onChange}
            className="px-2 py-2 rounded-lg border w-full"
            placeholder="Password"
          />
        </div>

        <Button type="submit" loading={loading} text="Create Account" />
      </form>
    </div>
  );
}

export default Signup;
