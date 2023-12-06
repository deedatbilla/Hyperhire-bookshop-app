"use client";
import { AxiosHost } from "@/axiosGlobal";
import axios from "axios";
import React, {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

interface ProviderProps {
  children: ReactNode;
}
export interface User {
  id: any;
  email: string;
  name: string;
  credits: number;
  token: string;
}
export interface Book {
  id: string;
  title: string;
  writer: string;
  coverImage: string;
  price: string;
  tags: string[];
}
export interface Order {
  id: string;
  status: string;
  amount: number;
  book: Book;
}
export interface AppContext {
  user: User;
  addUserDetails: (data: User) => void;
  getUser: () => void;
}
const Context = createContext<AppContext>({
  user: null,
  addUserDetails: () => {},
  getUser: () => {},
});

const Provider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User>();
  const addUserDetails = (data: User) => {
    setUser(data);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      AxiosHost.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      addUserDetails(JSON.parse(storedUser));
    }
  }, []);

  const getUser = async () => {
    try {
      const { data } = await AxiosHost.get(`/user`);

      addUserDetails(data.user);
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  // Persist user state in localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [user]);
  const state: AppContext = {
    user,
    addUserDetails,
    getUser,
  };
  // console.log(state);
  return <Context.Provider value={state}>{children}</Context.Provider>;
};

const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
