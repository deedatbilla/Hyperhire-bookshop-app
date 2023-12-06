"use client";
import Button from "@/components/Button";
import { useAppContext } from "@/context/context";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const { addUserDetails } = useAppContext();
  const router = useRouter();
  const [values, setValues] = useState({
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
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_BASE_URL}/user/sigin`,
        values
      );
      setLoading(false);
      addUserDetails(data.user);
      localStorage.setItem("token", data.user.token);
      router.push("/");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex flex-col mx-auto max-w-sm mt-10 px-4">
      <h1>Login</h1>
      <form onSubmit={onSubmit} className="flex flex-col space-y-5 mt-4">
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
        <Button  type="submit" loading={loading} text="Login" />
      </form>
    </div>
  );
}

export default Login;
