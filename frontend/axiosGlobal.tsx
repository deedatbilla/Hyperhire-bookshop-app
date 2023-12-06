'use client'
import axios from "axios";

export const $API_HOST = `${process.env.NEXT_PUBLIC_APP_API_BASE_URL}`;

export const $AuthHeader = {
  Accept: "application/json",
  authorization: `Bearer ${
    typeof window !== "undefined" && localStorage.getItem("token")
  }`,
};

export const AxiosHost = axios.create({
  baseURL: $API_HOST,
});
